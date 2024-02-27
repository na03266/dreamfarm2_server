import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MQTT_USER_ID, MQTT_USER_PW } from "./const/env.const";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MY_MQTT_SERVICE",  //* MY_MQTT_SERVICE : 의존성 이름
        transport: Transport.MQTT,
        options: {
          url: "mqtt://livewalk901.iptime.org:1883",
          username: MQTT_USER_ID,
          password: MQTT_USER_PW

        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
