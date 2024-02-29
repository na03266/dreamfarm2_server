import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../common/entyity/base.entity";
import { ControllersModel } from "../../controller/entities/controllers.entity";
import { SensorSettingModel } from "./sensors.setting.entity";

@Entity()
export class SensorDataModel extends BaseModel{
  @PrimaryGeneratedColumn()
  id:number

  @ManyToOne(() => ControllersModel, (controller) => controller.controllerId)
  @JoinColumn({ name: 'controllerId' })
  controllerId: string;

  @OneToOne(()=>SensorSettingModel, (sonsor)=> sonsor.sensorId)
  sensorId: number;

  @Column({
    comment: '센서 값'
  })
  sensorValue: number;
}