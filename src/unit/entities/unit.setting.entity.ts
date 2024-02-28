// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { BaseModel } from '../../common/entyity/base.entity';
// import { ControllerModel } from "./controller.entity";
//
// @Entity()
// export class UnitSettingModel extends BaseModel {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @ManyToOne(()=>ControllerModel, (controller)=>controller.controllerId)
//   @JoinColumn({name: 'controllerId'})
//   controllerId: string
//
//   @Column({
//     comment: '작동기 ID'
//   })
//   unitId: number;
//
//   @Column({
//     comment: '작동기 타입'
//   })
//   unitType: number;
//
//   @Column({
//     comment: '작동기 채널'
//   })
//   unitChannel: number;
//
//   @Column({
//     comment: '작동기 오픈 채널'
//   })
//   unitOpenChannel: number;
//
//   @Column({
//     comment: '작동기 클로즈 채널'
//   })
//   unitCloseChannel: number;
//
//   @Column({
//     comment: '작동기 이동 시간'
//   })
//   unitMoveTime: number;
//
//   @Column({
//     comment: '작동기 정지 시간'
//   })
//   unitStopTime: number;
//
//   @Column({
//     comment: '작동기 오픈 시간'
//   })
//   unitOpenTime: string;
//
//   @Column({
//     comment: '작동기 클로즈 시간'
//   })
//   unitCloseTime: string;
//
//   @Column({
//     comment: '작동기 동작 유형'
//   })
//   unitOperatingType: number;
//
//   @Column({
//     comment: '작동기 타이머'
//   })
//   unitTimer: string;
//
// }
