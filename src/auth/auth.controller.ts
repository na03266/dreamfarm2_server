import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { UsersModel } from '../users/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, false);

    /**
     * {accessToken: {token}}
     */
    return {
      accessToken: newToken,
    };
  }

  /**
   * 요청이 올시 토큰을 갱신
   * @param rawToken
   */
  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, true);

    /**
     * {refreshToken: {token}}
     */
    return {
      refreshToken: newToken,
    };
  }

  /**
   * 헤더로 전송받은 사용자 정보로 로그인
   * @param rawToken
   * @param req
   */
  @Post('login/id')
  @UseGuards(BasicTokenGuard)
  postLoginId(@Headers('authorization') rawToken: string, @Request() req) {
    // userId: password -> Base64
    // asdflkjasjhdfjklhas -> email:password
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithId(credentials);
  }
//
  /**
   * 바디값에 담긴 정보로 회원가입
   * 회원 추가 시 PostMan 같은 툴을 이용해서 http://livewalk901.iptime.org/auth/register/id 주소에서
   * 바디에 userId, password, {name, phoneNumber, address, role}(없어도 됨) 을 넣은 후 전송
   * @param body
   */
  @Post('register/id')
  postRegisterId(@Body() body: UsersModel) {
    return this.authService.registerWithId(body);
  }
}
