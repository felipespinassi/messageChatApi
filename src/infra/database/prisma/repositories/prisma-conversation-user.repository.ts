import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConversationUserRepository } from "src/core/repositories/conversationUser.repository";

@Injectable()
export class PrismaConversationUserRepository
  implements ConversationUserRepository
{
  constructor(private prismaService: PrismaService) {}

  create(conversationUser: any): any {
    return this.prismaService.conversationUser.createMany({
      data: conversationUser.user_id.map((userId) => ({
        conversation_id: conversationUser.conversation_id,
        user_id: userId,
      })),
    });
  }
}
