import { SensorsSettingModel } from './sensors.setting.entity';
import { SensorsDataModel } from './sensors.data.entity';
import { Entity } from "typeorm";

@Entity()
export class SensorsSettingLogModel extends SensorsSettingModel {}
@Entity()
export class SensorsDataLogModel extends SensorsDataModel {}