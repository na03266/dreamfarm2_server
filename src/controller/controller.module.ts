import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from '../users/entities/users.entity';
import { ControllersSettingModel } from './entities/controllers.setting.entity';
import { ControllersModel } from './entities/controllers.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ControllersSettingModel,
      UsersModel,
      ControllersModel,
    ]),
  ],
  controllers: [ControllerController],
  providers: [ControllerService, AuthService, JwtService, UsersService],
  exports: [ControllerService],
})
export class ControllerModule {}
