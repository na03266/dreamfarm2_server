import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * 1) 요청 객체(request)를 불러오고
   *      authorization header 로부터 토큰을 가져온다.
   *
   * 2) authService.extractTokenFromHeader 를 이용해서
   *      사용할 수 있는 형태의 토큰을 추출한다.
   *
   * 3) authService.decodeBasicToken 을 실행해서
   *      userId 와 password 를 추출한다.
   *
   * 4) userId 와 password 를 이용해서 사용자를 가져온다.
   *      authService.authenticateWithIdAndPassword
   *
   * 5) 찾아낸 사용자를 (1)의 요청 객체에 붙여준다.
   *      req.user = user;
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다!');
    }

    //헤더에서 토큰 값 가져오기
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    // 유저 아이디와 패스워드 객체 생성
    const { userId, password } = this.authService.decodeBasicToken(token);

    //
    const user = this.authService.authenticateWithIdAndPassword({
      userId,
      password,
    });

    req.user = user;

    return true;
  }
}
