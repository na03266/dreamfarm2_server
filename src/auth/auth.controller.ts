import { Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('thken/access')
  // postTokenAccess(
  //   @Headers('authorization') rawToken: string
  // ){
  //   const token = this.authService.extractTokenFromHeader(rawToken, true);
  //
  //   const newToken = this.authService.rotateToken(token, false);
  //
  //   /**
  //    * {accessToken: {token}}
  //    */
  //   return{
  //     accessToken: newToken,
  //   }
  // }
}
