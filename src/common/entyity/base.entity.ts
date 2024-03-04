import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber } from "class-validator";

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @UpdateDateColumn()
  @IsDate()
  logTime: Date;
}
