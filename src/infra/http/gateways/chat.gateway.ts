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
import { MessageService } from "src/core/services/message.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);
  constructor(private messageService: MessageService) {}

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
  async handleMessage(
    @MessageBody()
    data: {
      room: string;
      content: string;
      userId: number;
      conversationId: string;
      type: string;
      userName: string;
    },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(
      `Message: ${data.content} from client id: ${client.id} to room: ${data.room}`
    );
    const messageDto = {
      content: data.content,
      conversationId: data.conversationId,
      userId: data.userId,
      type: data.type,
      userName: data.userName,
    };
    const newMessage = await this.messageService.createMessage(messageDto);

    this.server.to(data.room).emit("onMessage", newMessage);
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
