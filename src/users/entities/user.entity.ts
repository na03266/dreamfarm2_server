import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { RolesEnum } from '../const/roles.const';

@Entity()
export class UsersModel extends BaseModel {
  @PrimaryColumn()
  userId: string;

  @Column({
    unique: true,
  })
  userEmail: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  name: string;

  @Column({
    nullable: true
  })
  phoneNumber: string;

  @Column({
    nullable: true
  })
  address: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;
}
