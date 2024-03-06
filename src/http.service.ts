import { HttpStatus, Inject, Injectable, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MQTT_TOPIC } from './const/env.const';
import { take } from 'rxjs';
import { Request, Response } from 'express';
import {
  CreateControllersSettingDto,
  SendControllerSettingDto,
} from './controller/dto/create-controllers-setting.dto';

@Injectable()
export class HttpService {
  constructor(@Inject('MY_MQTT_SERVICE') private client: ClientProxy) {}

  async postWithPublish(@Req() req: Request, @Res() res?: Response) {
    // GET 방식으로 데이터를 받아서 처리
    let sendData: any;
    const testData: CreateControllersSettingDto = req.body;

    for (let key of Object.keys(req.body)) {
      if ('AWS' === key) {
        sendData = {
          CTRL_SETTING: req.body,
        };
      }
    }

    await this.client.send(`${MQTT_TOPIC}`, sendData).pipe(take(1)).subscribe();
    const newRes = res.status(HttpStatus.OK).send({ yourRequest: req.body });
    return newRes;
  }
}
