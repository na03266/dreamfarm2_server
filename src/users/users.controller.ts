import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 모든 유저 정보 받기(관리자용)
   */
  @Get()
  getUsers() {
    return this.usersService.getAllUser();
  }

  /**
   * 유저 정보 바디로 유효값과 무효값을 모두 받아서 데이터베이스에 저장, 수정기능 추가
   */
  @Post()
  postUser(
    @Body('userId') userId: string,
    @Body('userEmail') userEmail: string,
    @Body('password') password: string,
  ) {
    // return this.usersService.createUser({userEmail,userId,password});
  }
}
