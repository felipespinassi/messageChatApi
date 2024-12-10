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
}
