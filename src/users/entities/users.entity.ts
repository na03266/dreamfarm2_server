import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { RolesEnum } from '../const/roles.const';
import { ControllersModel } from '../../controller/entities/controllers.entity';

@Entity()
export class UsersModel {
  @PrimaryColumn()
  userId: string;

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
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => ControllersModel, (controller) => controller.user)
  controllers: ControllersModel[];
}
