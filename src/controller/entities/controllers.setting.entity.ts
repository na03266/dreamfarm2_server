import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from '../../common/entyity/base.entity';
import { ControllersModel } from "./controllers.entity";

@Entity()
export class ControllersSettingModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ControllersModel, (controller) => controller.controllerId)
  @JoinColumn({ name: 'controllerId' })
  controllerId: ControllersModel;

  @Column({
    comment: '제어 설정 온도',
  })
  setTemp: string;

  @Column({
    comment: '온도 편차',
  })
  tempGap: number;

  @Column({
    comment: '제상 히터 온도',
  })
  heatTemp: number;

  @Column({
    comment: '냉동기 타입',
  })
  iceType: number;

  @Column({
    comment: '경보 유형',
  })
  alarmType: number;

  @Column({
    comment: '고온 경보 한계',
  })
  alarmTempHigh: number;

  @Column({
    comment: '저온 경보 한계',
  })
  alarmTempLow: number;

  @Column({
    comment: '전화번호',
  })
  phone: string;

  @Column({
    comment: 'amazon web server 사용 여부',
  })
  awsUsed: number;
}
