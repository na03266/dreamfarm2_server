import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { HOST, MQTT_PORT, MQTT_USER_ID, MQTT_USER_PW } from "./const/env.const";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.MQTT,
    options: {
      url:`mqtt://${HOST}:${MQTT_PORT}`,
      username: MQTT_USER_ID,
      password: MQTT_USER_PW
    }
  });
  app.listen();
}
bootstrap();
