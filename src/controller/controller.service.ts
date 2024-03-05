import { InjectRepository } from '@nestjs/typeorm';
import { ControllersSettingModel } from './entities/controllers.setting.entity';
import { Repository } from 'typeorm';
import { CreateControllersSettingDto } from './dto/create-controllers-setting.dto';

export class ControllerService {
  constructor(
    @InjectRepository(ControllersSettingModel)
    private controllersSettingRepository: Repository<ControllersSettingModel>,
  ) {}

  /**
   * ControllerSetting DB insert 로직
   * @param createDto
   */
  async createControllerSetting(
    createDto: CreateControllersSettingDto,
  ): Promise<ControllersSettingModel> {
    /**
     * 일단 값 변환
     */
    const newSetting = {
      CID: createDto.CID,
      SETTEMP: createDto.SETTEMP,
      TEMPGAP: parseInt(createDto.TEMPGAP, 10),
      HEATTEMP: parseFloat(createDto.HEATTEMP),
      ICETYPE: parseInt(createDto.ICETYPE, 10),
      ALARMTYPE: parseInt(createDto.ALARMTYPE, 10),
      ALRAMTEMPH: parseFloat(createDto.ALRAMTEMPH),
      ALRAMTMEPL: parseFloat(createDto.ALRAMTMEPL),
      TEL: createDto.TEL,
      AWS: parseInt(createDto.AWS, 10),
    };

    // CID 를 기준으로 가장 최신의 세팅값을 불러옴
    const latestSetting =
      (await this.controllersSettingRepository.findOne({
        select: [
          'CID',
          'SETTEMP',
          'TEMPGAP',
          'HEATTEMP',
          'ICETYPE',
          'ALARMTYPE',
          'ALRAMTEMPH',
          'ALRAMTMEPL',
          'TEL',
          'AWS',
        ],
        where: {
          CID: createDto.CID,
        },
        order: { logTime: 'DESC' },
      })) ?? null;
    console.log(latestSetting);

    if (!latestSetting) {
      const createSetting =
        this.controllersSettingRepository.create(newSetting);
      this.controllersSettingRepository.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
      /**
       * 최신 값이 있고 값이 다르면 갱신
       */
    } else if (!this.areObjectsEqual(latestSetting, newSetting)) {
      console.log('ah');
      const updatedSetting =
        this.controllersSettingRepository.create(newSetting);
      await this.controllersSettingRepository.save(updatedSetting);
      return updatedSetting;
    }
  }

  areObjectsEqual(
    obj1: Partial<ControllersSettingModel>,
    obj2: Partial<ControllersSettingModel>,
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
