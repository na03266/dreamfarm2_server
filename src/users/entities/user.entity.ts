import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { RolesEnum } from '../const/roles.const';
import { ControllerModel } from '../../controller/entities/controller.entity';

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
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => ControllerModel, (controller) => controller.controllerId)
  controllers: ControllerModel[];
}
