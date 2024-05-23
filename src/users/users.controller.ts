import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BasicTokenGuard } from '../auth/guard/basic-token.guard';
import { BearerTokenGuard } from '../auth/guard/bearer-token.guard';
import { UsersModel } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 모든 유저 정보 받기(관리자용)
   * 관리자인 경우만 가능하도록 변경
   */
  @Get()
  getUsers() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  patchUser(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.updateUserById(id, body);
  }

  @Delete(':id')
  deleteUsers(@Param('id') id: string, @Body() Body: string[]) {
    return this.usersService.deleteUser(id, Body);
  }
}
