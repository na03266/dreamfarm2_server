import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUser();
  }

  @Post()
  postUser(
    @Body('userId') userId: string,
    @Body('userEmail') userEmail: string,
    @Body('password') password: string,
  ) {
    // return this.usersService.createUser({userEmail,userId,password});
  }
}
