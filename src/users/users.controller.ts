import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminFunctionDto } from './dto/admin-function.dto.';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 모든 유저 정보 받기(관리자용)
   * 관리자인 경우만 가능하도록 변경
   */
  @Get('all/:id')
  getUsers(@Param('id') id: string,
    @Query() query: AdminFunctionDto) {
    return this.usersService.getAllUser(id, query);
  }

  @Get('one/:id')
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
