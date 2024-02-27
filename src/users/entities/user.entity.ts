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
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;
}
