import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConversationUserRepository } from "src/core/repositories/conversationUser.repository";
import { MessageRepository } from "src/core/repositories/message.repository";
import { Message } from "src/core/entities/message";

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  create(entity: Message): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  findAll(userId: any) {
    throw new Error("Method not implemented.");
  }
}
