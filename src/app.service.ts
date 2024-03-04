import { Injectable } from "@nestjs/common";
import { MqttContext } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { SensorsValueModel } from "./sensor/entities/sensors.value.entity";
import { Repository } from "typeorm";
import { UnitsStatusModel } from "./unit/entities/units.status.entity";


export interface MqttData {
  SENSOR_VALUE?: Array<{
    CID: string;
    SID: string;
    VALUE: string;
  }>;
  UNIT_STATUS?: Array<{
    CID: string;
    UID: string;
    MODE: string;
    STATUS: string;
  }>;
}

@Injectable()
export class AppService {


  /**
   * 페이로드 값을 반환하는 함수
   * @param data
   * @param context
   */
  getDataByTopic(data: any): Object {
    // 이제 안전하게 context.getTopic()를 호출할 수 있습니다.

    // data 타입 및 내용 확인을 위한 로깅
    console.log(`Received data type: ${typeof data}`);
    console.log(`Received data:`, data);

    // data가 문자열인지 확인하고, 객체로 파싱 시도
    if (typeof data === "string") {
      try {
        const messageObject = JSON.parse(data);
        console.log(`Parsed data:`, messageObject);
        return messageObject;
      } catch (error) {
        console.error(`Parsing error:`, error);
        // JSON.parse() 실패 시 원본 데이터 로깅
        console.log(`Raw data: ${data}`);
      }
    } else {
      // data가 문자열이 아닌 경우, 이미 객체 형태일 수 있으므로 직접 로깅
      console.log(`Data is not a string, logging directly:`, data);
      return data;
    }
  }

  async parserOnGetData(data: MqttData) {
    if (data.SENSOR_VALUE) {
      // await this.
    }
  }
}
