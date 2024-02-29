import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitStatusModel } from './entities/units.status.entity';
import { UnitSettingModel } from './entities/units.setting.entity';
import { ControllersModel } from "../controller/entities/controllers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UnitStatusModel, UnitSettingModel, ControllersModel])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
