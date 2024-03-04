import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { IsString } from "class-validator";

@Entity()
export abstract class UnitsModel extends BaseModel {
  @PrimaryColumn()
  @IsString()
  CID: string;

  @Column()
  @IsString()
  UID: string;
}
