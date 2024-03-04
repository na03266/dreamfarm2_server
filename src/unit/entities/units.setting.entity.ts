import { Column, Entity } from 'typeorm';
import { UnitsModel } from './units.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class UnitsSettingModel extends UnitsModel {
  @Column({
    comment: '작동기 타입',
  })
  @IsNumber()
  UTYPE: number;

  @Column({
    comment: '작동기 채널',
  })
  @IsNumber()
  UCH: number;

  @Column({
    comment: '작동기 오픈 채널',
  })
  @IsNumber()
  UOPENCH: number;

  @Column({
    comment: '작동기 클로즈 채널',
  })
  @IsNumber()
  UCLOSECH: number;

  @Column({
    comment: '작동기 이동 시간',
  })
  @IsNumber()
  UMVTIME: number;

  @Column({
    comment: '작동기 정지 시간',
  })
  @IsNumber()
  USTTIME: number;

  @Column({
    comment: '작동기 오픈 시간',
  })
  @IsString()
  UOPENTIME: string;

  @Column({
    comment: '작동기 클로즈 시간',
  })
  @IsString()
  UCLOSETIME: string;

  @Column({
    comment: '작동기 동작 유형',
  })
  @IsNumber()
  UOPTYPE: number;

  @Column({
    comment: '작동기 타이머',
  })
  @IsString()
  UTIMER: string;
}
