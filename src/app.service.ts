import { Injectable } from '@nestjs/common';
import { UnitService } from './unit/unit.service';
import {
  CTRL_SETTING,
  MixedPayloadArray,
  SENSOR_SETTING,
  SENSOR_VALUE,
  UNIT_SETTING,
  UNIT_STATUS,
} from './const/interfaces';
import { MqttDto } from './const/mqtt.dto';
import { ControllerService } from './controller/controller.service';
import { CreateControllersSettingDto } from './controller/dto/create-controllers-setting.dto';
import { SensorService } from './sensor/sensor.service';
import { CreateUnitSettingDto } from './unit/dto/create-unit-setting.dto';
import { CreateUnitStatusDto } from './unit/dto/create-unit-status.dto';
import { CreateSensorSettingDto } from './sensor/dto/create-sensor-setting.dto';
import { CreateSensorValueDto } from './sensor/dto/create-sensor-value.dto';

@Injectable()
export class AppService {
  constructor(
    private controllerService: ControllerService,
    private unitService: UnitService,
    private sensorService: SensorService,
  ) {}

  /**
   * 페이로드 값을 반환하는 함수
   * @param data
   * @param context
   */
  getDataByTopic(mqttData: any) {
    // 이제 안전하게 context.getTopic()를 호출할 수 있습니다.

    // mqttData 타입 및 내용 확인을 위한 로깅
    // console.log(`Received mqttData type: ${typeof mqttData}`);
    console.log(`Received mqttData:`, mqttData);

    // mqttData가 문자열인지 확인하고, 객체로 파싱 시도
    if (typeof mqttData === 'string') {
      try {
        const messageObject: MixedPayloadArray = JSON.parse(mqttData);
        console.log(`Parsed mqttData:`, messageObject);
        return messageObject;
      } catch (error) {
        console.error(`Parsing error:`, error);
        // JSON.parse() 실패 시 원본 데이터 로깅
        console.log(`Raw mqttData: ${mqttData}`);
        return [];
      }
    } else {
      // mqttData가 문자열이 아닌 경우, 이미 객체 형태일 수 있으므로 직접 로깅
      // console.log(`Data is not a string, logging directly:`, mqttData);
      return this.processData(mqttData);
    }
  }

  /**
   * 수신 값에 따른 Object 분할
   * Object 별 파싱 로직으로 전달
   * @param data
   */
  processData(data: MqttDto) {
    // CTRL_SETTING 처리
    if (data.CTRL_SETTING) {
      this.processCtrlSetting(data.CTRL_SETTING);
    }

    if (data.UNIT_SETTING) {
      console.log(data.UNIT_SETTING);
      // UNIT_SETTING 배열 처리
      data.UNIT_SETTING.forEach((setting) => {
        // this.processUnitSetting(setting);
        // console.log(data.UNIT_SETTING);
      });
    }

    if (data.UNIT_STATUS) {
      // UNIT_STATUS 배열 처리
      data.UNIT_STATUS.forEach((setting) => {
        this.processUnitStatus(setting);
        // console.log(data.SENSOR_SETTING);
      });
    }

    if (data.SENSOR_SETTING) {
      // SENSOR_SETTING 배열 처리
      data.SENSOR_SETTING.forEach((setting) => {
        this.processSensorSetting(setting);
        // console.log(data.SENSOR_SETTING);
      });
    }

    if (data.SENSOR_VALUE) {
      // SENSOR_VALUE 배열 처리
      data.SENSOR_VALUE.forEach((setting) => {
        this.processSensorValue(setting);
        // console.log(data.SENSOR_SETTING);
      });
    }
  }

  /**
   * 컨트롤러 세팅값 자료형 변환
   * @param setting
   * @private
   */
  private processCtrlSetting(setting: CreateControllersSettingDto) {
    // console.log('Processing CTRL_SETTING:', setting);
    return this.controllerService.createControllerSetting(setting);
  }

  /**
   * 유닛 세팅값 자료형 변환
   * @param setting
   * @private
   */
  private processUnitSetting(setting: CreateUnitSettingDto) {
    // console.log('Processing UNIT_SETTING:', setting);
    return this.unitService.createUnitSetting(setting);
  }

  /**
   * 유닛 상태 값 자료형 변환
   * @param setting
   * @private
   */
  private processUnitStatus(setting: CreateUnitStatusDto) {
    // console.log('Processing UNIT_STATUS:', setting);
    // SENSOR_VALUE 관련 로직 구현
    return this.unitService.createUnitStatus(setting);
  }

  /**
   * 센서 세팅값 자료형 변환
   * @param setting
   * @private
   */
  private processSensorSetting(setting: CreateSensorSettingDto) {
    // console.log('Processing SENSOR_SETTING:', setting);
    // SENSOR_SETTING 관련 로직 구현
    return this.sensorService.createSensorSetting(setting);
  }

  /**
   * 센서 값 자료형 변환
   * @param setting
   * @private
   */
  private processSensorValue(setting: CreateSensorValueDto) {
    // console.log('Processing SENSOR_VALUE:', setting);
    // SENSOR_VALUE 관련 로직 구현
    return this.sensorService.createSensorValue(setting);
  }

  /**
   * mqtt 발행 서비스
   */

}
