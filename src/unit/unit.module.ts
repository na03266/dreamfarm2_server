import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsStatusModel } from './entities/units.status.entity';
import { UnitsSettingModel } from './entities/units.setting.entity';
import { ControllersModel } from '../controller/entities/controllers.entity';
import { UnitsModel } from "./entities/units.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitsModel,
      UnitsSettingModel,
      UnitsStatusModel,
    ]),
  ],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
