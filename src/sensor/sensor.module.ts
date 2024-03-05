import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsSettingModel } from './entities/sensors.setting.entity';
import { SensorsModel } from './entities/sensors.entity';
import { SensorsValueModel } from './entities/sensors.value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SensorsSettingModel,
      SensorsModel,
      SensorsValueModel,
    ]),
  ],
  controllers: [SensorController],
  providers: [SensorService],
  exports:[SensorService]
})
export class SensorModule {}
