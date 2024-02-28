import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModel } from './entities/controllers.entity';
import { UsersModel } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControllersModel, UsersModel])],
  controllers: [ControllerController],
  providers: [ControllerService],
})
export class ControllerModule {}
