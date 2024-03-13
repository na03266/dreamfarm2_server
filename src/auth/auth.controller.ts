import { Controller, Headers, Post, UseGuards, Request, Body } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { BasicTokenGuard } from "./guard/basic-token.guard";
import { RegisterUserDto } from "./dto/register-user.dto";

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
  postTokenRefresh(
    @Headers('authorization') rawToken: string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, true);

    /**
     * {refreshToken: {token}}
     */
    return{
      refreshToken: newToken,
    }
  }

  /**
   * 헤더로 전송받은 사용자 정보로 로그인
   * @param rawToken
   * @param req
   */
  @Post('login/id')
  @UseGuards(BasicTokenGuard)
  postLoginId(
    @Headers('authorization') rawToken: string,
    @Request() req
  ) {
    // userId: password -> Base64
    // asdflkjasjhdfjklhas -> email:password
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithId(credentials);
  }

  /**
   * 바디값에 담긴 정보로 회원가입
   * @param body
   */
  @Post('register/id')
  postRegisterId(
    @Body()body:RegisterUserDto
    // @Body('nickname') nickname: string,
    // @Body('email') email: string,
    // @Body('password', new MaxLengthPipe(8), new MinLenghtPipe(3)) password: string,
  ) {
    return this.authService.registerWithId(body);
  }
}
