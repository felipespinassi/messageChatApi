import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/core/entities/user";
import { PrismaUserMapper } from "../mapper/prisma-user.mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User | null> {
    const raw = PrismaUserMapper.toPrisma(user);

    const rawUser = await this.prismaService.user.create({
      data: raw,
    });
    if (rawUser) {
      return PrismaUserMapper.toDomain(rawUser);
    }

    return null;
  }

  findAll(): Promise<any | null> {
    return this.prismaService.user.findMany();
  }
  findOneByEmail(email: string): Promise<any | null> {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  findOneById(id: number): Promise<any | null> {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
