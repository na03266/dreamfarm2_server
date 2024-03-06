import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { AppService } from './app.service';
import { MQTT_TOPIC } from './const/env.const';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MY_MQTT_SERVICE') private readonly client: ClientProxy // 클라이언트 주입
  ) {}

  /**
   * 구독, 토픽명 DreamFarm/Controller
   * @param data : 페이로드
   * @param context : 토픽
   */
  @MessagePattern(`${MQTT_TOPIC}`)
  getNotifications(@Payload() data: any) {
    return this.appService.getDataByTopic(data);
  }
}
