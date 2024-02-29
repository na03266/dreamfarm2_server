import { Column, Entity } from 'typeorm';
import { UnitsModel } from './units.entity';

@Entity()
export class UnitsStatusModel extends UnitsModel {
  @Column()
  mode: number;
  @Column()
  status: number;
}
