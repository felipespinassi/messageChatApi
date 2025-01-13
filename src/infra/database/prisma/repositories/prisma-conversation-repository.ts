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

  async findByUserIds(userId1: number, userId2: number): Promise<any> {
    const conversations = await this.prismaService.conversation.findMany({
      where: {
        AND: [
          {
            users: {
              some: {
                user_id: userId1,
              },
            },
          },
          {
            users: {
              some: {
                user_id: userId2,
              },
            },
          },
          {
            users: {
              every: {
                OR: [{ user_id: userId1 }, { user_id: userId2 }],
              },
            },
          },
        ],
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

    return conversations.map((conversation) => ({
      ...conversation,
      users: conversation.users.map((u) => u.user),
    }));
  }
  async findOneById(id: string): Promise<any | null> {
    return await this.prismaService.conversation.findUnique({
      where: {
        id,
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
  }
}
