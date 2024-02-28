// import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { ControllerModel } from "./controller.entity";
// import { BaseModel } from "../../common/entyity/base.entity";
// import { SensorSettingModel } from "./sensor.setting.entity";
//
// @Entity()
// export class SensorDataModel extends BaseModel{
//   @PrimaryGeneratedColumn()
//   id:number
//
//   @ManyToOne(() => ControllerModel, (controller) => controller.controllerId)
//   @JoinColumn({ name: 'controllerId' })
//   controllerId: string;
//
//   @OneToOne(()=>SensorSettingModel, (sonsor)=> sonsor.sensorId)
//   sensorId: number;
//
//   @Column({
//     comment: '센서 값'
//   })
//   sensorValue: number;
// }