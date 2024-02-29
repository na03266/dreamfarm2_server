import { Column, Entity } from 'typeorm';
import { SensorsModel } from './sensors.entity';

@Entity()
export class SensorsDataModel extends SensorsModel {
  @Column({
    comment: '센서 값',
  })
  value: number;
}
