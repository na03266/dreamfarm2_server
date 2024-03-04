import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { MQTT_TOPIC } from "./const/env.const";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // constructor(@Inject('MY_MQTT_SERVICE') private client : ClientProxy) { //* MY_MQTT_SERVICE : 의존성 이름
  // }

  /**
   * 구독, 토픽명 DreamFarm/Controller
   * @param data : 페이로드
   * @param context : 토픽
   */
  @MessagePattern(`${MQTT_TOPIC}`)
  getNotifications(@Payload() data: any) {
    return this.appService.parserOnGetData(data);
  }
}
