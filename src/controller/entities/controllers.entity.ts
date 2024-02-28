import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { UsersModel } from '../../users/entities/users.entity';

@Entity()
export class ControllersModel extends BaseModel {
  @PrimaryColumn()
  controllerId: string;

  @ManyToOne(() => UsersModel, (user) => user.controllers)
  @JoinColumn({ name: 'userId' })
  user: UsersModel;

  // /**
  //  * controller setting 일대다
  //  */
  // @OneToMany(
  //   () => ControllerSettingModel,
  //   (settingModel) => settingModel.controllerId,
  // )
  // controllerSettings: ControllerSettingModel[];
  //
  // /**
  //  * 유닛 세팅 일대다
  //  */
  // @OneToMany(
  //   () => UnitSettingModel,
  //   (unitSettingModel) => unitSettingModel.controllerId,
  // )
  // controllerUnits: UnitSettingModel[];
  //
  // /**
  //  * 센서 세팅 일대다
  //  */
  // @OneToMany(() => SensorSettingModel, (sensorId) => sensorId.controllerId)
  // sensors: SensorSettingModel[];
}
