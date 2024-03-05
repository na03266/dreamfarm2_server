import { Column, Entity } from 'typeorm';
import { SensorsModel } from './sensors.entity';

@Entity()
export class SensorsValueModel extends SensorsModel {
  @Column('float', {
    comment: '센서 값',
  })
  VALUE: number;
}
