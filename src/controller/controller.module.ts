import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from '../users/entities/users.entity';
import { ControllersSettingModel } from './entities/controllers.setting.entity';
import { AppModule } from '../app.module';
import { HttpService } from "../http.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ControllersSettingModel, UsersModel]),
  ],
  controllers: [ControllerController],
  providers: [ControllerService],
  exports: [ControllerService],
})
export class ControllerModule {}
