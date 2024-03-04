import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';

@Entity()
export abstract class UnitsModel extends BaseModel {
  @PrimaryColumn()
  CID: string;

  @Column()
  UID: string;
}
