import { Request, Response } from 'express';
import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MQTT_TOPIC } from './const/env.const';
import { HttpService } from './http.service';

@Controller()
export class HttpController {
  constructor(
    @Inject('MY_MQTT_SERVICE') private client: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  @Post('send')
  async handleGetRequest(@Req() req: Request, @Res() res?: Response) {
    const postData = await this.httpService.postWithPublish(req, res);
    return postData;
  }
}
