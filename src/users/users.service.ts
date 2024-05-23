import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HASH_ROUNDS } from '../auth/const/auth.const';
import * as bcrypt from 'bcrypt';

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

    /**
     * 사용자 권한 명따라서 에러 던지게 만들것.
     */

    // createUserDto 에서 받은 정보를 기반으로 새로운 UsersModel 인스턴스 생성
    const userObj = this.userRepository.create(user);

    // 생성된 UsersModel 인스턴스를 데이터베이스에 저장
    const newUser = await this.userRepository.save(userObj);

    return newUser;
  }

  /**
   * 모든 사용자 정보 불러오기
   */
  async getAllUser(user?: UsersModel) {
    if (user.role) {
      return await this.userRepository.find({
        where: { role: user.role },
      });
    }

    if (user.upperManager) {
      return await this.userRepository.find({
        where: { upperManager: user.upperManager },
      });
    }
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

  /**
   * 수정, 삭제
   * 조건부로
   * 삭제는 여러명이 오더라도 동시 삭제가 가능하도록.
   */
  async updateUserById(userId: string, userDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!userId) {
      throw new NotFoundException('존재하는 아이디가 없습니다.');
    }
    /**
     * 키 값이 패스워드인 경우 암호화
     * 키 값이 아이디인 경우 로직에서 제외
     */
    for (const [key, value] of Object.entries(userDto)) {
      const exceptId = value && (key !== 'userId' || 'password');
      let hashedValue;

      // 키 값이 패스워드인 경우 암호화
      if (key === 'password') {
        hashedValue = await bcrypt.hash(value, HASH_ROUNDS);
      }

      /**
       * 값이 있고, 키가 userId나 password가 아닌경우 바로 배열에 삽입,
       * password 인 경우 암호화된 값을 삽입
       */
      if (exceptId) {
        user[key] = value;
      } else if (key === 'password') {
        user[key] = hashedValue;
      }
    }

    const newUser = this.userRepository.save(user);

    return newUser;
  }

  async deleteUser(userId: string, userList: string[]): Promise<string[]> {
    const deletedUser: string[] = [];

    for (const user of userList) {
      const oldUser = await this.userRepository.findOne({
        where: {
          userId: user,
        },
      });

      // 유저가 존재하지 않는 경우 예외 처리
      if (!oldUser) {
        throw new NotFoundException(`User with ID ${user} not found`);
      }

      await this.userRepository.delete(oldUser.userId);

      deletedUser.push(oldUser.userId);
    }

    return deletedUser;
  }
}
