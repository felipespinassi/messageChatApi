import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { MessageRepository } from "src/core/repositories/message.repository";
import { Message } from "src/core/entities/message";
import { PrismamMessageMapper } from "../mapper/prisma-message.mapper";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message as MessageSchema } from "../../mongoose/schemas/message.schema";

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  constructor(
    private prismaService: PrismaService,
    @InjectModel("Message") private message: Model<MessageSchema>
  ) {}
  async create(entity: Message) {
    const raw = PrismamMessageMapper.toPrisma(entity);
    const rawMessage = await this.message.create(raw);

    if (rawMessage) {
      return PrismamMessageMapper.toDomain(rawMessage);
    }

    return null;
  }
  async findAll(userId: any) {
    return await this.message.create({
      content: "felipe",
      user_id: "1",
      conversation_id: "1",
      type: "text",
    });
  }
}
