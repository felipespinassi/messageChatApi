import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConversationRepository } from "src/core/repositories/conversation.repository";
import { Conversation } from "src/core/entities/conversation";
import { PrismaConversationMapper } from "../mapper/prisma-conversation.mapper";

@Injectable()
export class PrismaConversationRepository implements ConversationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(conversation: Conversation): Promise<Conversation | null> {
    const raw = PrismaConversationMapper.toPrisma(conversation);
    const rawConversation = await this.prismaService.conversation.create({
      data: raw,
    });

    if (rawConversation) {
      return PrismaConversationMapper.toDomain(rawConversation);
    }

    return null;
  }
  async findAll(userId: number): Promise<Conversation[] | null> {
    const rawConversations = await this.prismaService.conversation.findMany({
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

    if (rawConversations) {
      return rawConversations.map((raw) =>
        PrismaConversationMapper.toDomain(raw)
      );
    }
    return null;
  }

  async findByUserIds(
    userId1: number,
    userId2: number
  ): Promise<Conversation | null> {
    const conversation = await this.prismaService.conversation.findFirst({
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

    if (conversation) {
      return PrismaConversationMapper.toDomain(conversation);
    }

    return null;
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
