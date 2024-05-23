import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, MQTT_PORT, MQTT_USER_ID, MQTT_USER_PW } from './const/env.const';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModel } from './users/entities/users.entity';
import { ControllerModule } from './controller/controller.module';
import { ControllersModel } from './controller/entities/controllers.entity';
import { SensorModule } from './sensor/sensor.module';
import { UnitModule } from './unit/unit.module';
import { UnitsStatusModel } from './unit/entities/units.status.entity';
import { UnitsSettingModel } from './unit/entities/units.setting.entity';
import { ControllersSettingModel } from './controller/entities/controllers.setting.entity';
import { UnitsModel } from './unit/entities/units.entity';
import { SensorsModel } from './sensor/entities/sensors.entity';
import { SensorsSettingModel } from './sensor/entities/sensors.setting.entity';
import { SensorsValueModel } from './sensor/entities/sensors.value.entity';
import { OutboundResponseSerializer } from './common/object-utils';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsocketsGateway } from './gatewatys/websockets.gateway';

const clients = ClientsModule.register([
  {
    name: 'MY_MQTT_SERVICE', //* MY_MQTT_SERVICE : 의존성 이름
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${HOST}:${MQTT_PORT}`,
      username: MQTT_USER_ID,
      password: MQTT_USER_PW,
      serializer: new OutboundResponseSerializer(),
    },
  },
]);

@Module({
  imports: [
    ScheduleModule.forRoot(), // 스케줄 모듈 추가
    clients,
    UsersModule,
    CommonModule,
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        UsersModel,
        ControllersModel,
        ControllersSettingModel,
        UnitsModel,
        UnitsSettingModel,
        UnitsStatusModel,
        SensorsModel,
        SensorsSettingModel,
        SensorsValueModel,
      ],
      synchronize: true,
    }),
    AuthModule,
    ControllerModule,
    SensorModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WebsocketsGateway,
    // WebRtcGateway
  ],
  exports: [clients], // 다른 모듈에서 쓸 수 있게 출력
})
export class AppModule {}
