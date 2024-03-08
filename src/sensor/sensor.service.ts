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
   * SensorSetting DB insert
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
   * CID와 SID를 기준으로 센서 최신 값 가져오기
   * @param CID
   * @param SID
   */
  async ttfindLatestSensorValue(CID: string, SID: string) {
    return (
      (await this.sensorsValueRepository.findOne({
        select: ['CID', 'SID', 'VALUE'],
        where: { CID, SID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }
}
