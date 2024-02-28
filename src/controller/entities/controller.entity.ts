import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { UsersModel } from '../../users/entities/user.entity';
import { ControllerSettingModel } from './controller.setting.entity';

@Entity()
export class ControllerModel extends BaseModel {
  @PrimaryColumn()
  controllerId: string;

  @ManyToOne(() => UsersModel, (user) => user.userId, {
    nullable: false,
  })
  userId: string;

  @OneToMany(() => ControllerSettingModel, (settingModel) => settingModel.id)
  controllerSetting: ControllerSettingModel[];
}