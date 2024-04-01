import { InjectRepository } from '@nestjs/typeorm';
import { ControllersSettingModel } from './entities/controllers.setting.entity';
import { Repository } from 'typeorm';
import {
  ControllerToUserDto,
  CreateControllersSettingDto,
} from './dto/create-controllers-setting.dto';
import { Inject, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ControllersModel } from './entities/controllers.entity';
import { ControllerController } from './controller.controller';
import { UsersModel } from '../users/entities/users.entity';
import { NotFoundError } from 'rxjs';

export class ControllerService {
  constructor(
    @InjectRepository(ControllersSettingModel)
    private controllersSettingRepository: Repository<ControllersSettingModel>,
    @InjectRepository(ControllersModel)
    private controllersRepository: Repository<ControllersModel>,
    @InjectRepository(UsersModel)
    private usersRepository: Repository<UsersModel>,
  ) {}

  /**
   * ControllerSetting DB insert
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

    const latestSetting = await this.findLatestControllerSetting(createDto.CID);

    /**
     * 세팅이 없으면 삽입
     * 최근 세팅이 있고 세팅이 다르면 삽입
     */
    if (!latestSetting) {
      const createSetting =
        this.controllersSettingRepository.create(newSetting);
      this.controllersSettingRepository.save(createSetting);
      return createSetting; // 여기서 함수를 종료합니다.
    } else if (!this.areObjectsEqual(latestSetting, newSetting)) {
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

  /**
   * CID 를 기준으로 최신 컨트롤러 세팅 값 가져오기
   * @param CID
   */
  async findLatestControllerSetting(CID: string) {
    return (
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
        where: { CID },
        order: { logTime: 'DESC' },
      })) ?? null
    );
  }

  /**
   * 유저 아이디와 컨트롤러 아이디를 저장
   * 만약 기존에 정보가 있다면 업데이트
   * @param createDto : CID, userId
   */
  async updateControllerOfUser(createDto: {
    CID: string;
    userId: string;
  }): Promise<ControllersModel> {
    const newSetting = {
      CID: createDto.CID,
      user: { userId: createDto.userId },
    };

    const createSetting = this.controllersRepository.create(newSetting);
    // save 메소드는 정보가 있다면 업데이트, 없다면 생성함
    await this.controllersRepository.save(createSetting);
    return createSetting;

    return createSetting;
  }

  /**
   * 아이디에 할당된 컨트롤러 목록 불러오기
   */
  async getControllersById(id: string) {
    const controller = await this.controllersRepository.find({
      where: {
        user: { userId: id },
      },
    });

    // 없으면 못찾음 에러
    if (!controller) {
      throw new NotFoundException();
    }
    return controller;
  }
}
