import { Injectable } from "@nestjs/common";
import { MessageRepository } from "../repositories/message.repository";
import { CreateMessageDto } from "../dtos/message/create-message.dto";
import { Message } from "../entities/message";

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(createConversationUserDto: CreateMessageDto) {
    const message = new Message();

    message.content = createConversationUserDto.content;
    message.type = createConversationUserDto.type;
    message.userId = createConversationUserDto.userId;
    message.conversationId = createConversationUserDto.conversationId;
    message.sentAt = new Date();

    const newMessage = await this.messageRepository.create(message);

    if (!message) {
      throw new Error("Erro ao criar nova mensagem");
    }

    return newMessage;
  }

  findAll(userId: any) {
    return this.messageRepository.findAll(userId);
  }
}
