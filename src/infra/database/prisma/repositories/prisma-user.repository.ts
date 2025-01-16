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

  async findAll(): Promise<User[] | null> {
    const rawUsers = await this.prismaService.user.findMany();

    return rawUsers.map((rawUser) => PrismaUserMapper.toDomain(rawUser));
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return PrismaUserMapper.toDomain(user);
    }

    return null;
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user) {
      return PrismaUserMapper.toDomain(user);
    }

    return null;
  }
}
