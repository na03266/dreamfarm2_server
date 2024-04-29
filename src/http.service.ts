import { HttpStatus, Inject, Injectable, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MQTT_TOPIC } from './const/env.const';
import { Request, Response } from 'express';

@Injectable()
export class HttpService {
  constructor(@Inject('MY_MQTT_SERVICE') private client: ClientProxy) {}

  async postWithPublish(@Req() req: Request, @Res() res?: Response) {
    // GET 방식으로 데이터를 받아서 처리
    const originalData: any = req.body;
    const { pattern, id, ...dataWithoutPatternAndId } = originalData;
    const sendData: any = dataWithoutPatternAndId;

    console.log(sendData);
    // MQTT를 통해 데이터 발행

    await this.client.emit(MQTT_TOPIC, sendData);
    const newRes = res.status(HttpStatus.OK).send({ yourRequest: req.body });
    return newRes;
  }
}
