// src/gateways/app.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(55000, { transports: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, payload: any): void {
    const roomName = 'room123456';
    client.join(roomName);
    client.to(roomName).emit('joined');
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, offer: any): void {
    const roomName = 'room123456';
    client.to(roomName).emit('offer', offer);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, answer: any): void {
    const roomName = 'room123456';
    client.to(roomName).emit('answer', answer);
  }

  @SubscribeMessage('ice')
  handleIceCandidate(client: Socket, ice: any): void {
    const roomName = 'room123456';
    client.to(roomName).emit('ice', ice);
  }
}
