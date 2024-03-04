import { Column, Entity } from 'typeorm';
import { UnitsModel } from './units.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class UnitsStatusModel extends UnitsModel {
  @Column()
  @IsNumber()
  MODE: number;

  @Column()
  @IsNumber()
  STATUS: number;
}
