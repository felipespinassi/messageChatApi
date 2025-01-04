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
}
