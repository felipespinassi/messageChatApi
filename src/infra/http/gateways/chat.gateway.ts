import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client id: ${client.id} disconnected`);
  }

  @SubscribeMessage("newMessage")
  handleMessage(
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(
      `Message: ${data.message} from client id: ${client.id} to room: ${data.room}`
    );
    this.server.to(data.room).emit("onMessage", { msg: data });
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(room);
    client.emit("joinedRoom", room);
    this.logger.log(`Client id: ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket
  ) {
    client.leave(room);
    client.emit("leftRoom", room);
    this.logger.log(`Client id: ${client.id} left room: ${room}`);
  }
}
