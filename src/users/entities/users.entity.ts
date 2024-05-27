import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { RolesEnum } from '../const/roles.const';
import { ControllersModel } from '../../controller/entities/controllers.entity';

@Entity()
export class UsersModel {
  /**
   *  아이디, 비밀번호, 이름, 폰, 주소, 역할
   */
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

  @Column({
    nullable: true,
  })
  superior?: string;
}
