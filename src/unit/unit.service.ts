import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsStatusModel } from './entities/units.status.entity';
import { UnitsSettingModel } from './entities/units.setting.entity';
import { CreateUnitSettingDto } from './dto/create-unit-setting.dto';
import { CreateUnitStatusDto } from './dto/create-unit-status.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitsStatusModel)
    private readonly unitsStatusRepository: Repository<UnitsStatusModel>,
    @InjectRepository(UnitsSettingModel)
    private readonly unitsSettingRepository: Repository<UnitsSettingModel>,
  ) {}

  /**
   * UnitSetting DB insert 로직
   * @param createDto
   */
  async createUnitSetting(
    createDto: CreateUnitSettingDto,
  ): Promise<UnitsSettingModel> {
    /**
     * 값 변환
     */
    const newSetting = {
      CID: createDto.CID,
      UID: createDto.UID,
      UTYPE: parseInt(createDto.UTYPE),
      UGROUP: parseInt(createDto.UGROUP),
      UCH: parseInt(createDto.UCH),
      UOPENCH: parseInt(createDto.UOPENCH),
      UCLOSECH: parseInt(createDto.UCLOSECH),
      UMVTIME: parseInt(createDto.UMVTIME),
      USTTIME: parseInt(createDto.USTTIME),
      UOPENTIME: createDto.UOPENTIME,
      UCLOSETIME: createDto.UCLOSETIME,
      UOPTYPE: parseInt(createDto.UOPTYPE),
      UTIMER: createDto.UTIMER,
    };

    const latestSetting = await this.findLatestUnitSetting(
      createDto.CID,
      createDto.UID,
    );

    /**
     * 최신 값이 없으면 그냥 삽입
     * 최신 값이 있고 값이 다르면 삽입
     */
    if (!latestSetting) {
      const createSetting = this.unitsSettingRepository.create(newSetting);
      this.unitsSettingRepository.save(createSetting);
      return createSetting;
    } else if (!this.areSettingObjectsEqual(latestSetting, newSetting)) {
      const updatedSetting = this.unitsSettingRepository.create(newSetting);
      await this.unitsSettingRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

  /**
   * 유닛 세팅 최신값과 입력값 비교
   * @param obj1 : 입력값
   * @param obj2 : 최신값
   */
  areSettingObjectsEqual(
    obj1: Partial<UnitsSettingModel>,
    obj2: Partial<UnitsSettingModel>,
  ): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true; // 모든 키에 대해 값이 같다면, 두 객체는 동일
  }

  /**
   * CID와 UID를 기준으로 유닛 최신 세팅 1개 가져오기
   * @param CID
   * @param UID
   */
  async findLatestUnitSetting(CID: string, UID: string) {
    return (
      (await this.unitsSettingRepository.findOne({
        select: [
          'CID',
          'UID',
          'UTYPE',
          'UGROUP',
          'UCH',
          'UOPENCH',
          'UCLOSECH',
          'UMVTIME',
          'USTTIME',
          'UOPENTIME',
          'UCLOSETIME',
          'UOPTYPE',
          'UTIMER',
        ],
        where: { CID, UID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }

  /**
   * CID 를 기준으로 유닛 최신 세팅 1개씩 가져오기
   * @param CID
   * @param UID
   */
  async findLatestUnitSettings(CID: string) {
    return (
      (await this.unitsSettingRepository.find({
        select: [
          'CID',
          'UID',
          'UTYPE',
          'UGROUP',
          'UCH',
          'UOPENCH',
          'UCLOSECH',
          'UMVTIME',
          'USTTIME',
          'UOPENTIME',
          'UCLOSETIME',
          'UOPTYPE',
          'UTIMER',
        ],
        where: { CID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }

  /**
   * UnitStatus DB insert
   */
  async createUnitStatus(
    createDto: CreateUnitStatusDto,
  ): Promise<UnitsStatusModel> {
    /**
     * 값 변환
     */
    const newSetting = {
      CID: createDto.CID,
      UID: createDto.UID,
      MODE: parseInt(createDto.MODE),
      STATUS: parseInt(createDto.STATUS),
    };

    const latestSetting = await this.findLatestUnitStatus(
      createDto.CID,
      createDto.UID,
    );

    /**
     * 최신 값이 없으면 그냥 삽입
     * 최신 값이 있고 값이 다르면 삽입
     */
    if (!latestSetting) {
      const createSetting = this.unitsStatusRepository.create(newSetting);
      this.unitsStatusRepository.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
    } else if (!this.areStatusObjectsEqual(latestSetting, newSetting)) {
      console.log('ah');
      const updatedSetting = this.unitsStatusRepository.create(newSetting);
      await this.unitsStatusRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

  /**
   *  최신값과 입력값 비교
   * @param obj1 : 입력값
   * @param obj2 : 최신값
   */
  areStatusObjectsEqual(
    obj1: Partial<UnitsStatusModel>,
    obj2: Partial<UnitsStatusModel>,
  ): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true; // 모든 키에 대해 값이 같다면, 두 객체는 동일
  }

  /**
   * CID와 UID를 기준으로 유닛 최신 상태 1개만 가져오기
   * @param CID
   * @param UID
   */
  async findLatestUnitStatus(CID: string, UID: string) {
    return (
      (await this.unitsStatusRepository.findOne({
        select: ['CID', 'UID', 'MODE', 'STATUS'],
        where: { CID, UID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }

}
