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
import { ControllersSettingLogModel } from './controller/entities/controllers.setting.log.entity';
import { UnitsSettingLogModel } from './unit/entities/units.log.entity';
import { UnitStatusLogModel } from './unit/entities/unit.status.log.entity';
import { SensorsSettingModel } from './sensor/entities/sensors.setting.entity';
import { SensorsDataModel } from './sensor/entities/sensors.data.entity';
import {
  SensorsDataLogModel,
  SensorsSettingLogModel,
} from './sensor/entities/sensors.log.entity';

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
      entities: [
        UsersModel,
        ControllersModel,
        ControllersSettingModel,
        ControllersSettingLogModel,
        UnitsModel,
        UnitsSettingModel,
        UnitsSettingLogModel,
        UnitsStatusModel,
        UnitStatusLogModel,
        SensorsModel,
        SensorsSettingModel,
        SensorsDataModel,
        SensorsSettingLogModel,
        SensorsDataLogModel,
      ],
      synchronize: true,
    }),
    AuthModule,
    ControllerModule,
    SensorModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [clients], // 다른 모듈에서 쓸 수 있게 출력
})
export class AppModule {}
