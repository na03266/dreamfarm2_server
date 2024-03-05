import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsStatusModel } from './entities/units.status.entity';
import { UnitsSettingModel } from './entities/units.setting.entity';
import { CreateControllersSettingDto } from '../controller/dto/create-controllers-setting.dto';
import { ControllersSettingModel } from '../controller/entities/controllers.setting.entity';
import { CreateUnitSettingDto } from './dto/create-unit-setting.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitsStatusModel)
    private readonly unitsStatusRepository: Repository<UnitsStatusModel>,
    @InjectRepository(UnitsSettingModel)
    private readonly unitsSettingRepository: Repository<UnitsSettingModel>,
  ) {}

  /**
   * ControllerSetting DB insert 로직
   * @param createDto
   */
  async createUnitSetting(
    createDto: CreateUnitSettingDto,
  ): Promise<UnitsSettingModel> {
    /**
     * 일단 값 변환
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

    // CID 를 기준으로 가장 최신의 세팅값을 불러옴
    const latestSetting =
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
        where: {
          CID: createDto.CID,
        },
        order: { logTime: 'DESC' },
      })) ?? null;
    console.log(latestSetting);

    if (!latestSetting) {
      const createSetting = this.unitsSettingRepository.create(newSetting);
      this.unitsSettingRepository.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
      /**
       * 최신 값이 있고 값이 다르면 갱신
       */
    } else if (!this.areObjectsEqual(latestSetting, newSetting)) {
      console.log('ah');
      const updatedSetting = this.unitsSettingRepository.create(newSetting);
      await this.unitsSettingRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

  areObjectsEqual(
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
}
