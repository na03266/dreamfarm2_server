import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { SensorDataModel } from './sensors.data.entity';
import { ControllersModel } from '../../controller/entities/controllers.entity';

@Entity()
export class SensorSettingModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ControllersModel, (controller) => controller.controllerId)
  @JoinColumn({ name: 'controllerId' })
  controllerId: string;

  @OneToOne(() => SensorDataModel, (sensor) => sensor.sensorId)
  @JoinColumn({ name: 'sensorId' })
  sensorId: number;

  @Column({
    comment: '센서 채널',
  })
  sensorChannel: number;

  @Column({
    comment: '센서 예약어',
  })
  sensorReserved: number;

  @Column({
    comment: '보정값 계수',
  })
  senserMult: number;

  @Column({
    comment: '오프셋 값',
  })
  sensorOffset: number;

  @Column({
    comment: '변환 수식',
  })
  sensorEQ: string;
}
