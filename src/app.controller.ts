import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload as pd, ClientProxy, Payload, Ctx, MqttContext } from "@nestjs/microservices";
import {take} from 'rxjs';

@Controller()
export class AppController {

  constructor(@Inject('MY_MQTT_SERVICE') private client : ClientProxy) { //* MY_MQTT_SERVICE : 의존성 이름
    // setTimeout(() => {  //3초뒤에 메시지를 발송하게 하였습니다.
    //   const data = {number : Math.random(), text : AppController.name};
    //   this.client.send('Korean',data).pipe(take(1)).subscribe();
    // }, 3000);
  }


  @MessagePattern('World')  //구독하는 주제1
  모두받기(@pd() data: any){
    console.log(data);
  }
  @MessagePattern('notifications')
  getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);

    // data 타입 및 내용 확인을 위한 로깅
    console.log(`Received data type: ${typeof data}`);
    console.log(`Received data:`, data);

    // data가 문자열인지 확인하고, 객체로 파싱 시도
    if (typeof data === 'string') {
      try {
        const messageObject = JSON.parse(data);
        console.log(`Parsed data:`, messageObject);
      } catch (error) {
        console.error(`Parsing error:`, error);
        // JSON.parse() 실패 시 원본 데이터 로깅
        console.log(`Raw data: ${data}`);
      }
    } else {
      // data가 문자열이 아닌 경우, 이미 객체 형태일 수 있으므로 직접 로깅
      console.log(`Data is not a string, logging directly:`, data);
    }
  }
  @MessagePattern('American')  //구독하는 주제2
  고유받기(@pd() data: any){
    console.log(data);
  }
}