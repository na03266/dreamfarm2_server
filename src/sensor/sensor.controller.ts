import { Controller, Get, Param } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get('setting/:CID')
  getSensorSettings(@Param('CID') CID: string) {
    return this.sensorService.findLatestSensorSettings(CID);
  }

  /**
   * 단일 컨트롤러의 센서 세팅만 불러오는 엔드포인트
   * // 수정 요망,
   * @param CID
   */
  @Get('setting/:CID')
  getSensorSetting(@Param('CID') CID: string) {
    return this.sensorService.findLatestSensorSettings(CID);
  }

  /**
   * 센서 값들중 가장 최신의 값만 불러오는 엔드포인트
   * //수정해야함. 그래프에 적용 가능하도록
   * @param CID
   */
  @Get('value/:CID')
  getSensorValues(@Param('CID') CID: string) {
    return this.sensorService.findLatestSensorValues(CID);
  }
}
