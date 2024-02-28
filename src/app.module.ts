import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, MQTT_PORT, MQTT_USER_ID, MQTT_USER_PW } from './const/env.const';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

const clients = ClientsModule.register([
  {
    name: 'MY_MQTT_SERVICE', //* MY_MQTT_SERVICE : 의존성 이름
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${HOST}:${MQTT_PORT}`,
      username: MQTT_USER_ID,
      password: MQTT_USER_PW,
    },
  },
]);

@Module({
  imports: [
    clients,
    UsersModule,
    CommonModule,
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [clients], // 다른 모듈에서 쓸 수 있게 출력
})
export class AppModule {}
