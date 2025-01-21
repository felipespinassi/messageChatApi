import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { MessageRepository } from "src/core/repositories/message.repository";
import { Message } from "src/core/entities/message";
import { PrismamMessageMapper } from "../mapper/prisma-message.mapper";

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  constructor(private prismaService: PrismaService) {}
  async create(entity: Message) {
    const raw = PrismamMessageMapper.toPrisma(entity);
    const rawMessage = await this.prismaService.message.create({
      data: raw,
    });

    if (rawMessage) {
      return PrismamMessageMapper.toDomain(rawMessage);
    }

    return null;
  }
  findAll(userId: any) {
    throw new Error("Method not implemented.");
  }
}
