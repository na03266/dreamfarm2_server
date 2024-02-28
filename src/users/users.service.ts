import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}

  async createUser(user: Pick<UsersModel, 'userEmail' | 'userId' | 'password'>) {
    const idExists = await this.userRepository.exists({
      where: {
        userId: user.userId,
      },
    });

    if (idExists) {
      throw new BadRequestException('이미 존재하는 ID 입니다.');
    }
    const emailExists = await this.userRepository.exists({
      where: {
        userEmail: user.userEmail,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 Email 입니다.');
    }

    const userObj = this.userRepository.create({
      userId:user.userId,
      userEmail: user.userEmail,
      password:user.password
    })

    const newUser = await this.userRepository.save(user)

    return newUser;
  }
}
