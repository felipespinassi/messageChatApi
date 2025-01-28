import { Injectable } from "@nestjs/common";
import { Company } from "src/core/entities/company";
import { CompanyRepository } from "src/core/repositories/company.repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prismService: PrismaService) {}
  async create(entity: Company): Promise<Company | null> {
    const company = await this.prismService.company.create({
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        document: entity.document,
      },
    });

    if (company) {
      return company;
    }

    return null;
  }
  findAll(): Promise<Company[] | null> {
    throw new Error("Method not implemented.");
  }
  findOneByEmail(email: string): Promise<any | null> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: number): Promise<any | null> {
    throw new Error("Method not implemented.");
  }
}
