import { Column, Entity } from 'typeorm';
import { SensorsModel } from './sensors.entity';

@Entity()
export class SensorsSettingModel extends SensorsModel {
  @Column({
    comment: '센서 채널',
  })
  SCH: number;

  @Column({
    comment: '센서 예약어',
  })
  SRESERVERD: number;

  @Column('float', {
    comment: '보정값 계수',
  })
  SMULT: number;

  @Column('float', {
    comment: '오프셋 값',
  })
  SOFFSET: number;

  @Column({
    comment: '센서값 변환 수식',
  })
  SEQ: string;
}
