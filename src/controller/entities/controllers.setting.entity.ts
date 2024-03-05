import { Column, Entity } from 'typeorm';
import { ControllersModel } from './controllers.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class ControllersSettingModel extends ControllersModel {
  @Column({
    comment: '제어 설정 온도',
  })
  SETTEMP: string;

  @Column({
    comment: '온도 편차',
  })
  TEMPGAP: number;

  @Column('float', {
    comment: '제상 히터 온도',
  })
  HEATTEMP: number;

  @Column({
    comment: '냉동기 타입',
  })
  ICETYPE: number;

  @Column({
    comment: '경보 유형',
  })
  ALARMTYPE: number;

  @Column({
    comment: '고온 경보 한계',
  })
  ALRAMTEMPH: number;

  @Column({
    comment: '저온 경보 한계',
  })
  ALRAMTMEPL: number;

  @Column({
    comment: '전화번호',
  })
  TEL: string;

  @Column({
    comment: 'amazon web server 사용 여부',
  })
  AWS: number;
}
