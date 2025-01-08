import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/core/entities/user";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  create(user: User): any {
    return this.prismaService.user.create({
      data: user,
    });
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
