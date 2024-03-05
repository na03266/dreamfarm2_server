import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorsSettingModel } from './entities/sensors.setting.entity';
import { Repository } from 'typeorm';
import { CreateControllersSettingDto } from '../controller/dto/create-controllers-setting.dto';
import { ControllersSettingModel } from '../controller/entities/controllers.setting.entity';
import { CreateSensorSettingDto } from './dto/create-sensor-setting.dto';
import { SensorsValueModel } from './entities/sensors.value.entity';
import { CreateSensorValueDto } from './dto/create-sensor-value.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorsSettingModel)
    private sensorsSettingRepository: Repository<SensorsSettingModel>,
    @InjectRepository(SensorsValueModel)
    private sensorsValueReopsitory: Repository<SensorsValueModel>,
  ) {}

  /**
   * SensorSetting DB insert 로직
   * @param createDto
   */
  async createSensorSetting(
    createDto: CreateSensorSettingDto,
  ): Promise<SensorsSettingModel> {
    /**
     * 일단 값 변환
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

    // CID 를 기준으로 가장 최신의 세팅값을 불러옴
    const latestSetting =
      (await this.sensorsSettingRepository.findOne({
        select: ['CID', 'SID', 'SCH', 'SRESERVERD', 'SMULT', 'SOFFSET', 'SEQ'],
        where: {
          CID: createDto.CID,
        },
        order: { logTime: 'DESC' },
      })) ?? null;
    console.log(latestSetting);

    if (!latestSetting) {
      const createSetting = this.sensorsSettingRepository.create(newSetting);
      this.sensorsSettingRepository.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
      /**
       * 최신 값이 있고 값이 다르면 갱신
       */
    } else if (!this.areSettingObjectsEqual(latestSetting, newSetting)) {
      console.log('ah');
      const updatedSetting = this.sensorsSettingRepository.create(newSetting);
      await this.sensorsSettingRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

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
   * SensorValue DB insert 로직
   * @param createDto
   */
  async createSensorValue(
    createDto: CreateSensorValueDto,
  ): Promise<SensorsValueModel> {
    /**
     * 일단 값 변환
     */
    const newSetting = {
      CID: createDto.CID,
      SID: createDto.SID,
      VALUE: parseFloat(createDto.VALUE),
    };

    // CID 를 기준으로 가장 최신의 세팅값을 불러옴
    const latestSetting =
      (await this.sensorsValueReopsitory.findOne({
        select: ['CID', 'SID', 'VALUE'],
        where: {
          CID: createDto.CID,
        },
        order: { logTime: 'DESC' },
      })) ?? null;
    console.log(latestSetting);

    if (!latestSetting) {
      const createSetting = this.sensorsValueReopsitory.create(newSetting);
      this.sensorsValueReopsitory.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
      /**
       * 최신 값이 있고 값이 다르면 갱신
       */
    } else if (!this.areValueObjectsEqual(latestSetting, newSetting)) {
      console.log('ah');
      const updatedSetting = this.sensorsValueReopsitory.create(newSetting);
      await this.sensorsValueReopsitory.save(updatedSetting);
      return updatedSetting;
    }
  }

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
}
