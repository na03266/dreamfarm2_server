import { BaseModel } from "../../common/entyity/base.entity";
import { ControllersModel } from "../../controller/entities/controllers.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class SensorsModel extends BaseModel{

  @ManyToOne(()=>ControllersModel, (controller)=>controller.CID)
  CID:ControllersModel

  @Column()
  SID:string
}