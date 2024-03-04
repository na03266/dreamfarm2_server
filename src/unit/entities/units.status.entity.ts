import { Column, Entity } from 'typeorm';
import { UnitsModel } from './units.entity';

@Entity()
export class UnitsStatusModel extends UnitsModel {
  @Column()
  MODE: number;
  @Column()
  STATUS: number;
}
