import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload as pd, ClientProxy, Payload, Ctx, MqttContext } from "@nestjs/microservices";
import { take } from "rxjs";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  // constructor(@Inject('MY_MQTT_SERVICE') private client : ClientProxy) { //* MY_MQTT_SERVICE : 의존성 이름
  // }

  /**
   * 구독, 토픽명 DreamFarm/Controller
   * @param data : 페이로드
   * @param context : 토픽
   */
  @MessagePattern("DreamFarm/Controller")
  getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    return this.appService.getDataByTopic(data, context);
  }
}