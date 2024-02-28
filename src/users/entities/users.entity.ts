import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { RolesEnum } from '../const/roles.const';
import { ControllersModel } from '../../controller/entities/controllers.entity';

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
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => ControllersModel, (controller) => controller.user)
  controllers: ControllersModel[];
}
