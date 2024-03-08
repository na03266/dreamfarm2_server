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
    let sendData: any = req.body;

    for (let key of Object.keys(req.body)) {
      if ('AWS' === key) {
        sendData = [{
          CTRL_SETTING: req.body,
        }];
      } else if ('UTIMER' === key) {
        sendData = [{
          UNIT_SETTING: req.body,
        }];
      } else if ('STATUS' === key) {
        sendData = [{
          UNIT_STATUS: req.body,
        }];
      } else if ('SEQ' === key) {
        sendData = [{
          SENSOR_SETTING: req.body,
        }];
      } else if ('VALUE' === key) {
        sendData = [{
          SENSOR_VALUE: req.body,
        }];
      }
    }
    console.log(sendData);
//    { CID: 'AABBCC000020', UID: '19', MODE: '0', STATUS: '0' },
    await this.client.send(`${MQTT_TOPIC}`, sendData).pipe(take(1)).subscribe();
    const newRes = res.status(HttpStatus.OK).send({ yourRequest: req.body });
    return newRes;
  }
}
