import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConversationUserRepository } from "src/core/repositories/conversationUser.repository";
import { ConversationUser } from "src/core/entities/conversationUser";
import { PrismaConversationUserMapper } from "../mapper/prisma-conversation-user.mapper";

@Injectable()
export class PrismaConversationUserRepository
  implements ConversationUserRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(
    conversationUser: ConversationUser[]
  ): Promise<{ count: number } | null> {
    const raw = PrismaConversationUserMapper.toPrisma(conversationUser);
    const newConversationUser =
      await this.prismaService.conversationUser.createMany({
        data: raw,
      });

    if (newConversationUser) {
      return newConversationUser;
    }

    return null;
  }
}
