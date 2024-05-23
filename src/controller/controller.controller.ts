import { Controller, Get, Param, Post, Headers, Request } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { AuthService } from '../auth/auth.service';
import { ControllersModel } from './entities/controllers.entity';

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
   * 유저에 할당된 컨트롤러 목록 가져오기
   * @param rawToken
   * @param req
   */
  @Get('/list')
  async getControllerListsOfUser(
    @Headers('authorization') rawToken: string,
    @Request() req,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const extractedId = await this.authService.extractIdFromToken(token);
    const controllerList =
      this.controllerService.getControllersById(extractedId);

    return controllerList;
  }

  /**
   * 컨트롤러에 사용자를 저장
   * @param rawToken Bearer 토큰(사용자 아이디 추출 용도)
   * @param req
   * @param CID 컨트롤러 아이디
   */
  @Post('add/user')
  async postControllerToUser(
    @Headers('authorization') rawToken: string,
    @Request() req,
    @Param('CID') CID: string,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const userId = await this.authService.extractIdFromToken(token);
    const newController = {
      CID,
      userId,
    };
    const updateControllerList =
      this.controllerService.updateControllerOfUser(newController);

    return updateControllerList;
  }
}
