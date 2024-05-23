import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HOST, MQTT_PORT, MQTT_USER_ID, MQTT_USER_PW } from './const/env.const';
import { HttpModule } from './http.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OutboundResponseSerializer } from './common/object-utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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

  // swagger 초기화
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(httpApp, config);
  // /api에 요청하면 swaggerUI로 api문서를 보여준단 뜻임
  SwaggerModule.setup('api', httpApp, document);

  await httpApp.listen(3000);
}

bootstrap();
