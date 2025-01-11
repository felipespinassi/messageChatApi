import { Injectable } from "@nestjs/common";
import { MessageRepository } from "../repositories/message.repository";

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(createConversationUserDto: any) {
    return await this.messageRepository.create({
      ...createConversationUserDto,
      sent_at: new Date(),
    });
  }
}
