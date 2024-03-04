import { BaseModel } from '../../common/entyity/base.entity';
import { ControllersModel } from '../../controller/entities/controllers.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export abstract class SensorsModel extends BaseModel {
  @PrimaryColumn()
  CID: string;

  @PrimaryColumn()
  SID: string;
}