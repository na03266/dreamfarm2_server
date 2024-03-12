import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HOST, MQTT_PORT, MQTT_USER_ID, MQTT_USER_PW } from './const/env.const';
import { HttpModule } from './http.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OutboundResponseSerializer } from "./common/object-utils";

async function bootstrap() {
  // @ts-ignore
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: `mqtt://${HOST}:${MQTT_PORT}`,
        username: MQTT_USER_ID,
        password: MQTT_USER_PW,
        serializer: new OutboundResponseSerializer(),
      },
    },
  );
  app.listen();

  const httpApp = await NestFactory.create<NestExpressApplication>(HttpModule);
  await httpApp.listen(3000);
}

bootstrap();
