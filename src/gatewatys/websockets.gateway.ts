import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  userList = [];

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.id;
    this.userList.push(userId);
    console.log('[connection] userLogin', { userId });

    // 유저 연결시 데이터 보냄
    // broadcast 로 보낼경우 접속시 다른 유저 접속상태를 알 수 없음
    this.server.emit('updateUserlist', { userList: this.userList });
    console.log('[connection] userList sent', { userList: this.userList });
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: any): void {
    const { to, from, offerType, offerSDP, audioOnly } = payload;
    // offer가 왔을 때 처리
    // 1. [caller] 본인 아이디, 상대 아이디, offer data 전달
    // 2. 상대에게 본인 아이디, offer data 전달
    console.log('[offer] data', { to, from, audioOnly });
    client.to(to).emit('offer', { from, offerSDP, offerType, audioOnly });
  }

  @SubscribeMessage('refuse')
  handleRefuse(client: Socket, payload: any): void {
    const { to } = payload;
    console.log('[offer] refuse', { to });
    // offer refuse 처리
    client.to(to).emit('refuse');
  }

  // offer 요청에 대한 answer 응답 처리
  // 1. [callee] 상대방 아이디, answer data 전달
  // 2. 상대에게 answer data 전달
  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: any): void {
    const { to, answerSDP, answerType } = payload;
    console.log('[answer] data', { to });
    client.to(to).emit('answer', { answerSDP, answerType });
  }

  // ice candidate
  // send offer/answer 발생시 상대방에게 network정보 전달
  @SubscribeMessage('iceCandidate')
  handleIceCandidate(client: Socket, payload: any): void {
    const { to, candidate, sdpMid, sdpMLineIndex } = payload;
    console.log('[iceCandidate] data', {
      to,
      candidate,
      sdpMid,
      sdpMLineIndex,
    });
    client
      .to(to)
      .emit('remoteIceCandidate', { candidate, sdpMid, sdpMLineIndex, to });
  }

  // close peer connection
  @SubscribeMessage('disconnectPeer')
  handleDisconnectPeer(client: Socket, payload: any): void {
    const { to } = payload;
    console.log('[disconnect] to', { to });
    if (to !== null) {
      client.to(to).emit('disconnectPeer');
    }
  }

  // 연결 해제시 userlist update
  handleDisconnect(client: Socket) {
    this.userList = this.userList.filter((user) => user !== client.id);
    client.broadcast.emit('updateUserlist', { userList: this.userList });
    console.log('[disconnected] id:', client.id);
  }
}
