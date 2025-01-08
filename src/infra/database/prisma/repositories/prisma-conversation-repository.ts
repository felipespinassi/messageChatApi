import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConversationRepository } from "src/core/repositories/conversation.repository";

@Injectable()
export class PrismaConversationRepository implements ConversationRepository {
  constructor(private prismaService: PrismaService) {}

  create(conversation: any): any {
    return this.prismaService.conversation.create({
      data: conversation,
    });
  }
  async findAll(userId: number): Promise<any> {
    const conversations = this.prismaService.conversation.findMany({
      where: {
        users: {
          some: {
            user_id: userId,
          },
        },
      },
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            user_id: true,
            sent_at: true,
            type: true,
          },
        },
      },
    });
    return (await conversations).map((conversation) => ({
      ...conversation,
      users: conversation.users.map((u) => u.user),
    }));
  }
}
