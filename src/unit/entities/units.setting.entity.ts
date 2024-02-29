import { Column, Entity } from 'typeorm';
import { UnitsModel } from './units.entity';


@Entity()
export class UnitsSettingModel extends UnitsModel {

  @Column({
    comment: '작동기 타입'
  })
  UTYPE: number;

  @Column({
    comment: '작동기 채널'
  })
  UCH: number;

  @Column({
    comment: '작동기 오픈 채널'
  })
  UOPENCH: number;

  @Column({
    comment: '작동기 클로즈 채널'
  })
  UCLOSECH: number;

  @Column({
    comment: '작동기 이동 시간'
  })
  UMVTIME: number;

  @Column({
    comment: '작동기 정지 시간'
  })
  USTTIME: number;

  @Column({
    comment: '작동기 오픈 시간'
  })
  UOPENTIME: string;

  @Column({
    comment: '작동기 클로즈 시간'
  })
  UCLOSETIME: string;

  @Column({
    comment: '작동기 동작 유형'
  })
  UOPTYPE: number;

  @Column({
    comment: '작동기 타이머'
  })
  UTIMER: string;

}
