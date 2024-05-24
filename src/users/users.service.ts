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
import { AdminFunctionDto } from './dto/admin-function.dto.';

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
   * 조건에따라 사용자 목록 불러오기
   */
  async getAllUser(userId: string, query: AdminFunctionDto) {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new BadRequestException('사용자를 찾을 수 없습니다.');
    }

    if (user.role === 'USER') {
      throw new BadRequestException('접근할 수 없습니다.');
    }
    const qb = this.userRepository.createQueryBuilder('user');

    /**
     * role이 ADMIN면 모든 유저 전부 가져오기
     */
    if (user.role === 'ADMIN') {
      // 역할이 관리자인 사람
      if (query.role) {
        qb.andWhere('user.role = :role', { role: query.role });
      }

      // 상위 매니저가 옵션에 주어진 사람
      if (query.upperUser) {
        qb.andWhere('user.upperUser = :upperUser', {
          upperUser: query.upperUser,
        });
      }
      // 키워드가 포함된 사람
      if (query.keyword) {
        qb.andWhere('(user.name LIKE :keyword OR user.id LIKE :keyword)', {
          keyword: `%${query.keyword}%`,
        });
      }
    } else if (user.role === 'STAFF') {
      // 자기 자신 정보 보기
      if (userId) {
        qb.andWhere('user.usedId = :userId', { userId: userId });
      }

      // STAFF면 upperManager가 자신의 userId인 사용자
      qb.where('user.upperManager = :upperManager', {
        upperManager: user.userId,
      });

      //검색하는 역할이 ADMIN이 아니고 옵션이 있으면
      if (query.role && query.role !== 'ADMIN') {
        qb.andWhere('user.role = :role', { role: query.role });
      }

      // 검색하는 이름이나 아이디의 키워드가 있으면,
      // 아이디가 비슷하거나 이름이 비슷한 것 찾기
      if (query.keyword) {
        qb.andWhere('(user.name LIKE :keyword OR user.id LIKE :keyword)', {
          keyword: `%${query.keyword}%`,
        });
      }
    }
    /**
     * role이 STAFF면
     * upperManager 가 STAFF의 아이디인 유저를 가져온다
     */

    return await qb.getMany();
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

    if (userId !== userDto.userId) {
      throw new BadRequestException('아이디는 바꿀 수 없습니다.');
    }

    if (userDto.password) {
      userDto.password = await bcrypt.hash(userDto.password, HASH_ROUNDS);
    }

    /**
     * 키 값이 패스워드인 경우 암호화
     * 키 값이 아이디(userId)인 경우 로직에서 제외
     */
    for (const [key, value] of Object.entries(userDto)) {
      if (key !== 'userId') {
        user[key] = value;
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
