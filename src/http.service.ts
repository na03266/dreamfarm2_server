import { HttpStatus, Inject, Injectable, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MQTT_TOPIC } from './const/env.const';
import { take } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class HttpService {
  constructor(@Inject('MY_MQTT_SERVICE') private client: ClientProxy) {}

  async pubTopic(@Req() req: Request, @Res() res: Response) {
    // GET 방식으로 데이터를 받아서 처리
    console.log(req.query);
    await this.client
      .send(`${MQTT_TOPIC}`, req.query)
      .pipe(take(1))
      .subscribe();
    const newRes = res.status(HttpStatus.OK).send({ yourRequest: req.query });
    return newRes;
  }
}
