import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from '../../common/entyity/base.entity';
import { ControllersModel } from "../../controller/entities/controllers.entity";
import { ControllerModule } from "../../controller/controller.module";

@Entity()
export class UnitStatusModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>ControllersModel, (controller)=>controller.controllerId)
  Controllers: ControllersModel[]

  @ManyToOne(()=>UnitStatusModel, ()=>)
  Units: UnitStatusModel
}