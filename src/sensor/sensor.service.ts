import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorsSettingModel } from './entities/sensors.setting.entity';
import { Repository } from 'typeorm';
import { CreateSensorSettingDto } from './dto/create-sensor-setting.dto';
import { SensorsValueModel } from './entities/sensors.value.entity';
import { CreateSensorValueDto } from './dto/create-sensor-value.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorsSettingModel)
    private sensorsSettingRepository: Repository<SensorsSettingModel>,
    @InjectRepository(SensorsValueModel)
    private sensorsValueRepository: Repository<SensorsValueModel>,
  ) {}

  /**
   * SensorSetting DB insert (CID 와 SID 동시 기준)
   * @param createDto
   */
  async createSensorSetting(
    createDto: CreateSensorSettingDto,
  ): Promise<SensorsSettingModel> {
    /**
     * 값 변환
     */
    const newSetting = {
      CID: createDto.CID,
      SID: createDto.SID,
      SCH: parseInt(createDto.SCH),
      SRESERVERD: parseInt(createDto.SRESERVERD),
      SMULT: parseFloat(createDto.SMULT),
      SOFFSET: parseFloat(createDto.SOFFSET),
      SEQ: createDto.SEQ,
    };

    const latestSetting = await this.findLatestSensorSetting(
      createDto.CID,
      createDto.SID,
    );

    /**
     * 최신 값이 없으면 그냥 삽입
     * 최신 값이 있고 값이 다르면 삽입
     */
    if (!latestSetting) {
      const createSetting = this.sensorsSettingRepository.create(newSetting);
      this.sensorsSettingRepository.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
    } else if (!this.areSettingObjectsEqual(latestSetting, newSetting)) {
      const updatedSetting = this.sensorsSettingRepository.create(newSetting);
      await this.sensorsSettingRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

  /**
   * 센서 세팅 최신값과 입력값 비교
   * @param obj1 : 입력값
   * @param obj2 : 최신값
   */
  areSettingObjectsEqual(
    obj1: Partial<SensorsSettingModel>,
    obj2: Partial<SensorsSettingModel>,
  ): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true; // 모든 키에 대해 값이 같다면, 두 객체는 동일합니다.
  }

  /**
   * CID와 SID를 기준으로 센서 최신 세팅 가져오기
   * @param CID
   * @param SID
   */
  async findLatestSensorSetting(CID: string, SID: string) {
    return (
      (await this.sensorsSettingRepository.findOne({
        select: ['CID', 'SID', 'SCH', 'SRESERVERD', 'SMULT', 'SOFFSET', 'SEQ'],
        where: { CID, SID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }

  /**
   * CID 값에 해당하는 각각의 SID 의 VALUE 들을 불러옴 (최신정보 기준)
   * @param CID
   */
  async findLatestSensorSettings(CID: string) {
    // 먼저, 각 UID별로 최신 logTime 찾기
    const subQuery = this.sensorsSettingRepository
      .createQueryBuilder('us')
      .select('MAX(us.logTime)', 'maxLogTime')
      .addSelect('us.SID')
      .where('us.CID = :CID', { CID })
      .groupBy('us.SID')
      .getQuery();

    // 찾은 logTime을 사용하여 각 SID의 최신 상태 가져오기
    const latestStatuses = await this.sensorsSettingRepository
      .createQueryBuilder('us')
      .select([
        'us.CID',
        'us.SID',
        'us.VALUE',
        'us.SCH',
        'us.SRESERVERD',
        'us.SMULT',
        'us.SOFFSET',
        'us.SEQ',
      ])
      .where('us.CID = :CID', { CID })
      .andWhere(`(us.SID, us.logTime) IN (${subQuery})`)
      .setParameters({ CID })
      .getMany();

    return latestStatuses ?? null;
  }

  /**
   * SensorValue DB insert
   * @param createDto
   */
  async createSensorValue(
    createDto: CreateSensorValueDto,
  ): Promise<SensorsValueModel> {
    /**
     * 값 변환
     */
    const newSetting = {
      CID: createDto.CID,
      SID: createDto.SID,
      VALUE: parseFloat(createDto.VALUE),
    };

    const latestSetting = await this.findLatestSensorValue(
      createDto.CID,
      createDto.SID,
    );

    /**
     * 최신 값이 없으면 그냥 삽입
     * 최신 값이 있고 값이 다르면 삽입
     */
    if (!latestSetting) {
      const createSetting = this.sensorsValueRepository.create(newSetting);
      this.sensorsValueRepository.save(createSetting);
      return createSetting;
    } else if (!this.areValueObjectsEqual(latestSetting, newSetting)) {
      const updatedSetting = this.sensorsValueRepository.create(newSetting);
      await this.sensorsValueRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

  /**
   * 센서 값 최신값과 입력값 비교
   * @param obj1 : 입력값
   * @param obj2 : 최신값
   */
  areValueObjectsEqual(
    obj1: Partial<SensorsValueModel>,
    obj2: Partial<SensorsValueModel>,
  ): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true; // 모든 키에 대해 값이 같다면, 두 객체는 동일합니다.
  }

  /**
   * CID와 SID를 기준으로 센서 최신 값 가져오기
   * @param CID
   * @param SID
   */
  async findLatestSensorValue(CID: string, SID: string) {
    return (
      (await this.sensorsValueRepository.findOne({
        select: ['CID', 'SID', 'VALUE'],
        where: { CID, SID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }

  /**
   * CID 값에 해당하는 각각의 SID 의 VALUE 들을 불러옴 (최신정보 기준)
   * @param CID
   */
  async findLatestSensorValues(CID: string) {
    // 먼저, 각 UID별로 최신 logTime 찾기
    const subQuery = this.sensorsValueRepository
      .createQueryBuilder('us')
      .select('MAX(us.logTime)', 'maxLogTime')
      .addSelect('us.SID')
      .where('us.CID = :CID', { CID })
      .groupBy('us.SID')
      .getQuery();

    // 찾은 logTime을 사용하여 각 SID의 최신 상태 가져오기
    const latestStatuses = await this.sensorsValueRepository
      .createQueryBuilder('us')
      .select(['us.CID', 'us.SID', 'us.VALUE'])
      .where('us.CID = :CID', { CID })
      .andWhere(`(us.SID, us.logTime) IN (${subQuery})`)
      .setParameters({ CID })
      .getMany();

    return latestStatuses ?? null;
  }

  async findSensorValuesByDayRange(
    CID: string,
    startDate: Date,
    endDate: Date,
  ) {
    const sensorValues = await this.sensorsValueRepository
      .createQueryBuilder('us')
      .select(['us.CID', 'us.SID', 'us.VALUE', 'DATE(us.logTime) AS logDate'])
      .where('us.CID = :CID', { CID })
      .andWhere('us.logTime BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return sensorValues ?? null;
  }
}
