import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersModel } from '../users/entities/users.entity';
import { HASH_ROUNDS, JWT_SECRET } from './const/auth.const';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * 토큰을 사용하게 되는 방식
   *
   * 1) 사용자가 로그인 또는 회원가입을 진행하면 accessToken 과 refreshToken 을 발급 받는다.
   * 2) 로그인 할때는 Basic 토큰과 함께 요청을 보낸다.
   *    Basic 토큰은 '이메일:비밀번호'를 Base64로 인코딩한 형태
   *    예) {authorization: 'Basic {token}'}
   *
   * 3) 아무나 접근할 수 없는 정보 (private route)를 접근 할때는 accessToken 을 Header 에 추가해서 요청과 함께 보낸다.
   *    예) {authorization: 'Bearer {token}'}
   *
   * 4) 토큰과 요청을 함께 받은 서버는 토큰 검증을 통해 현재 요청을 보낸 사용자가 누군지 알 수 있다.
   *    예를 들어서 현재 로그인한 사용자가 작성한 포스트만 가져오려면 토큰의 sub값에 입력돼있는 사용자의 포스트만 따로 필터링할 수 있다.
   *    특정 사용자의 토큰이 없다면 다른 사용자의 데이터를 접근 못한다.
   *
   * 5) 모든 토큰은 만료 기간이 있다. 만료기간이 지나면 새로 토큰을 발급받아야한다.
   *    그렇지 않으면 jwtService.verify()에서 인증이 통과 안된다.
   *    그러니 access 토큰을 새로 발급받을 수 있는 /auth/token/access와
   *    refresh 토큰을 새로 발급 받을 수 있는 /auth/token/refresh가 필요하다.
   *
   * 6) 토큰이 만료되면 각각의 토큰을 새로 발급 받을 수 있는 엔드포인트에 요청을 해서
   *    새로운 토큰을 발급받고 사용해서 private route에 접근한다.
   */

  /**
   * 헤더에서 토큰을 받기
   * @param header
   * @param isBearer
   */
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다!');
    }

    const token = splitToken[1];

    return token;
  }

  /**
   * 토큰 검중
   */
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('토큰이 만료되었거나 잘못된 토큰입니다!');
    }
  }

  //
  /**
   * 토큰 재발급
   */
  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 refresh 토큰으로만 가능합니다.',
      );
    }
    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }

  /**
   * 베이직 토큰 디코딩
   */
  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf-8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다!');
    }

    const userId = split[0];
    const password = split[1];

    return {
      userId,
      password,
    };
  }

  /**
   * 1) registerWithId
   *      - Id, name, password를 입력받고 사용자를 생성한다.
   *      - 생성이 완료되면 accessToken과 refreshToken을 반환한다.
   *        회원가입 후 다시 로그인해주세요 <- 이런 쓸데없는 과정 방지
   *
   * 2) loginWithId
   *      - userId, password를 입력하면 사용자 검증을 진행한다.
   *      - 검증이 완료되면 accessToken과 refreshToken을 반환한다.
   *
   * 3) loginUser
   *      - 1, 2 에서 필요한 accessToken 과 refreshToken을 반환하는 로직
   *
   * 4) singToken
   *      - 3 에서 필요한 토큰(accessToken, refreshToken)들을 sign 하는 로직
   *
   * 5) authemticateWithIdAndPassword
   *      - 2에서 로그인을 진행할때 필요한 기본적인 검증을 진행
   *          1. 사용자가 존재하는지 확인(email)
   *          2. 비밀번호가 맞는지 확인
   *          3. 모두 통과되면 찾응 사용자 정보 반환
   *          4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
   *
   */

  /**
   * 필요한 토큰들을 서명하는 로직
   * @param user
   * @param isRefreshToken
   */
  signToken(
    user: Pick<UsersModel, 'userId' | 'name' | 'role'>,
    isRefreshToken: boolean,
  ) {
    const payload = {
      userid: user.userId,
      sub: user.name,
      role: user.role,
      expiresIn: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      // seconds
      expiresIn: isRefreshToken ? 3600000 : 3600,
    });
  }

  /**
   * 회원가입과 로그인에서 필요한 토큰을 반환하는 로직
   * id, pw check logic need
   * @param user
   */
  loginUser(user: Pick<UsersModel, 'userId' | 'name' | 'role'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  /**
   * 로그인에서 필요한 정보를 기본적인 검증을 진행
   *  1. 사용자가 존재하는지 확인(email)
   *  2. 비밀번호가 맞는지 확인
   *  3. 모두 통과되면 찾응 사용자 정보 반환
   *  4. loginWithId 에서 반환된 데이터를 기반으로 토큰 생성
   */
  async authenticateWithIdAndPassword(
    //
    user: Pick<UsersModel, 'userId' | 'password'>,
  ) {
    /**
     *    1. 사용자가 존재하는지 확인(email)
     *    2. 비밀번호가 맞는지 확인
     *    3. 모두 통과되면 찾은 사용자 정보 반환
     */
    const existingUser = await this.usersService.getUserById(user.userId);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }
    /**
     * 파라미터
     *
     * 1) 입력된 비밀번호
     * 2) 기존 해시(hash) -> 사용자 정보에 저장되어 있는 hash
     */
    const passOK = await bcrypt.compare(user.password, existingUser.password);

    if (!passOK) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    return existingUser;
  }

  /**
   * 로그인
   */
  async loginWithId(user: Pick<UsersModel, 'userId' | 'password'>) {
    try {
      const existingUser = await this.authenticateWithIdAndPassword(user);
      return this.loginUser(existingUser);
    } catch (e) {
      throw UnauthorizedException;
    }
  }

  /**
   * 회원가입, 성공시 바로 success message
   */
  async registerWithId(user: UsersModel) {
    const hash = await bcrypt.hash(user.password, HASH_ROUNDS);

    try {
      const newUser = await this.usersService.createUser({
        ...user,
        password: hash,
      });
      return {
        status: 'success',
      };
    } catch (e) {
      return {
        status: 'fail',
        message: `${e.message}`,
      };
    }
  }

  /**
   * 토큰에서 ID 만 추출하는 로직
   */
  async extractIdFromToken(token: string): Promise<string | null> {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
      return decodedToken.userid; // 사용자 ID 추출
    } catch (error) {
      return null; // 토큰 검증 실패 시 처리
    }
  }
}
