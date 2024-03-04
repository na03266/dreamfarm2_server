import { Injectable } from '@nestjs/common';
import { ClientOptions } from '@nestjs/microservices';
import { UnitService } from './unit/unit.service';

@Injectable()
export class AppService {
  constructor(private unitService: UnitService) {}

  /**
   * 페이로드 값을 반환하는 함수
   * @param data
   * @param context
   */
  getDataByTopic(mqttData: any): MixedPayloadArray {
    // 이제 안전하게 context.getTopic()를 호출할 수 있습니다.

    // mqttData 타입 및 내용 확인을 위한 로깅
    console.log(`Received mqttData type: ${typeof mqttData}`);
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
      console.log(`Data is not a string, logging directly:`, mqttData);
      return mqttData;
    }
  }

  /**
   * json 문자열을 javascript 객체로 변환하기
   * @param data
   */
  async parserOnGetData(data: any) {
    const mqttPayload = this.getDataByTopic(data);

    mqttPayload.forEach((item) => {
      // 선택적 체이닝을 사용하여 값이 존재하는지 안전하게 확인
      const ctrlSetting = item.CTRL_SETTING ?? []; // 기본값으로 빈 배열 제공
      const unitSetting = item.UNIT_SETTING ?? [];
      const sensorSetting = item.SENSOR_SETTING ?? [];
      const sensorValue = item.SENSOR_VALUE ?? [];
      const unitStatus = item.UNIT_STATUS ?? [];
    });
  }
}

/**
 * 타입가드
 * @param item
 */
function isCTRLSetting(item: any): item is CTRL_SETTING {
  return 'CID' in item && 'SETTEMP' in item;
}

function isUNITSetting(item: any): item is UNIT_SETTING {
  return 'UID' in item && 'UTYPE' in item;
}

function isSENSORSetting(item: any): item is SENSOR_SETTING {
  return 'SID' in item && 'SCH' in item;
}

function isSENSORValue(item: any): item is SENSOR_VALUE {
  return 'VALUE' in item && 'SID' in item && !('MODE' in item);
}

function isUNITStatus(item: any): item is UNIT_STATUS {
  return 'MODE' in item && 'STATUS' in item;
}
