import { Controller, Get, Param, Post, Headers, Request } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { AuthService } from '../auth/auth.service';

@Controller('controller')
export class ControllerController {
  constructor(
    private readonly controllerService: ControllerService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 컨트롤러 세팅 값 가져오기
   * @param CID
   */
  @Get(':CID')
  getControllerSetting(@Param('CID') CID: string) {
    return this.controllerService.findLatestControllerSetting(CID);
  }

  /**
   * 유저 정보에 따른 컨트롤러 목록 가져오기
   * @param rawToken
   * @param req
   * @param CID 유저 ID
   */
  @Post('/user/:CID')
  async postControllerToUser(
    @Headers('authorization') rawToken: string,
    @Request() req,
    @Param('CID') CID: string,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const extractedId = await this.authService.extractIdFromToken(token);
    const controllerList =
      this.controllerService.getControllersById(extractedId);

    return controllerList;
  }
}
