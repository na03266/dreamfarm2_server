import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModel } from './entities/controller.entity';
import { UsersModel } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControllerModel, UsersModel])],
  controllers: [ControllerController],
  providers: [ControllerService],
})
export class ControllerModule {}
