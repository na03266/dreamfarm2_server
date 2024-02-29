import { UnitsSettingModel } from './units.setting.entity';
import { UnitsStatusModel } from "./units.status.entity";
import { Entity } from "typeorm";

@Entity()
export class UnitsSettingLogModel extends UnitsSettingModel {}

@Entity()
export class UnitStatusLogModel extends UnitsStatusModel {}