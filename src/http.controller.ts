import { Request, Response } from 'express';
import {
  Controller,
  All,
  Res,
  Req,
  HttpStatus,
  Inject,
  Get, Post
} from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import { take } from 'rxjs';
import { MQTT_TOPIC } from './const/env.const';
import { HttpService } from './http.service';

@Controller()
export class HttpController {
  constructor(
    @Inject('MY_MQTT_SERVICE') private client: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  // @All('web')
  // async normal(@Req() req: Request, @Res() res: Response) {
  //   //get 방식으로 데이터를 받아서 data 라는 키 값으로 mqtt서버로 전송
  //   console.log(req.query);
  //   await this.client.send(`${MQTT_TOPIC}`, req.query).pipe(take(1)).subscribe();
  //   res.status(HttpStatus.OK).send({ yourRequest: req.query });
  // }
  @Post('web')
  async handleGetRequest(@Req() req: Request, @Res() res: Response) {
    return this.httpService.postWithPublish(req, res);
  }
}
