import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { UsersModel } from '../../users/entities/users.entity';
import { UnitsModel } from '../../unit/entities/units.entity';
import { SensorsModel } from '../../sensor/entities/sensors.entity';

@Entity()
export class ControllersModel extends BaseModel {
  @PrimaryColumn()
  CID: string;

  @ManyToOne(() => UsersModel, (user) => user.controllers)
  @JoinColumn({ name: 'userId' })
  user: UsersModel;

  /**
   * 유닛 세팅 일대다
   */
  @OneToMany(() => UnitsModel, (unit) => unit.UID)
  units: UnitsModel[];

  /**
   * 센서 세팅 일대다
   */
  @OneToMany(() => SensorsModel, (sensorId) => sensorId.CID)
  sensors: SensorsModel[];
}
