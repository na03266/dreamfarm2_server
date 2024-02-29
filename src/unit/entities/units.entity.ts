import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { ControllersModel } from '../../controller/entities/controllers.entity';
import { BaseModel } from '../../common/entyity/base.entity';
import { UnitsSettingModel } from './units.setting.entity';

@Entity()
export class UnitsModel extends BaseModel {
  @ManyToOne(() => ControllersModel, (controller) => controller.CID)
  CID: ControllersModel;

  @Column()
  UID: string;
}
