import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConversationUserRepository } from "src/core/repositories/conversationUser.repository";
import { MessageRepository } from "src/core/repositories/message.repository";
import { Message } from "src/core/entities/message";

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  constructor(private prismaService: PrismaService) {}
  create(entity: Message): any {
    return this.prismaService.message.create({
      data: {
        content: entity.content,
        conversation_id: entity.conversation_id,
        type: entity.type,
        user_id: entity.user_id,
        sent_at: entity.sent_at,
      },
    });
  }
  findAll(userId: any) {
    throw new Error("Method not implemented.");
  }
}
