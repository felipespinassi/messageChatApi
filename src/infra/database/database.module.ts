import { Module } from "@nestjs/common";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user.repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaConversationRepository } from "./prisma/repositories/prisma-conversation-repository";
import { ConversationRepository } from "src/core/repositories/conversation.repository";
import { ConversationUserRepository } from "src/core/repositories/conversationUser.repository";
import { PrismaConversationUserRepository } from "./prisma/repositories/prisma-conversation-user.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ConversationRepository,
      useClass: PrismaConversationRepository,
    },
    {
      provide: ConversationUserRepository,
      useClass: PrismaConversationUserRepository,
    },
  ],
  exports: [UserRepository, ConversationRepository, ConversationUserRepository],
})
export class DatabaseModule {}
