import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}

  /**
   * 사용자 계정 생성
   */
  async createUser(user: CreateUserDto) {
    /**
     * 동일 id 존재 하는지 확인하는 조건
     */
    const idExists = await this.userRepository.exists({
      where: {
        userId: user.userId,
      },
    });

    // 만약에 조건에 해당되는 값이 있다면 true 반환
    if (idExists) {
      throw new BadRequestException('이미 존재하는 ID 입니다.');
    }

    // createUserDto 에서 받은 정보를 기반으로 새로운 UsersModel 인스턴스 생성
    const userObj = this.userRepository.create(user);

    // 생성된 UsersModel 인스턴스를 데이터베이스에 저장
    const newUser = await this.userRepository.save(userObj);

    return newUser;
  }

  /**
   * 모든 사용자 정보 불러오기
   */
  async getAllUser() {
    return this.userRepository.find();
  }

  /**
   * 사용자 한명의 정보 불러오기
   * @param userId
   */
  async getUserById(userId: string) {
    return this.userRepository.findOne({
      where: {
        userId,
      },
    });
  }
}
