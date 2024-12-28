import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  create(user: any): any {
    return this.prismaService.user.create({
      data: user,
    });
  }

  findAll(): Promise<any | null> {
    return this.prismaService.user.findMany();
  }
  findOne(email: string): Promise<any | null> {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
