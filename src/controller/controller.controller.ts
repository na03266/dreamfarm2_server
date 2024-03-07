import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { CreateControllersSettingDto } from './dto/create-controllers-setting.dto';
import { CreateSensorValueDto } from '../sensor/dto/create-sensor-value.dto';
import { HttpService } from '../http.service';
import { response } from 'express';

@Controller('controller')
export class ControllerController {
  constructor(private readonly controllerService: ControllerService) {}

  /**
   * 컨트롤러 세팅 값 가져오기
   * @param CID
   */
  @Get(':CID')
  getControllerSetting(@Param('CID') CID: string) {
    return this.controllerService.findLatestControllerSetting(CID);
  }

  /**
   * 유저 정보에 따른 컨트롤러 목록 가져오기
   */

}
