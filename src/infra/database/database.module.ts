import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user.repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaConversationRepository } from "./prisma/repositories/prisma-conversation-repository";
import { ConversationRepository } from "src/core/repositories/conversation.repository";
import { ConversationUserRepository } from "src/core/repositories/conversationUser.repository";
import { PrismaConversationUserRepository } from "./prisma/repositories/prisma-conversation-user.repository";
import { MessageRepository } from "src/core/repositories/message.repository";
import { PrismaMessageRepository } from "./prisma/repositories/prisma-message-repository";
import { CompanyRepository } from "src/core/repositories/company.repository";
import { PrismaCompanyRepository } from "./prisma/repositories/prisma-company-repository";
import { MessageSchema } from "./mongoose/schemas/message.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:21456379fe@cluster0.qsjoq.mongodb.net/"
    ),

    MongooseModule.forFeature([
      {
        name: "Message",
        schema: MessageSchema,
      },
    ]),
  ],
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
    {
      provide: MessageRepository,
      useClass: PrismaMessageRepository,
    },
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
  ],
  exports: [
    UserRepository,
    ConversationRepository,
    ConversationUserRepository,
    MessageRepository,
    CompanyRepository,
  ],
})
export class DatabaseModule {}
