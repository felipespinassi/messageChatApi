import { Injectable } from "@nestjs/common";
import { Company } from "src/core/entities/company";
import { CompanyRepository } from "src/core/repositories/company.repository";
import { PrismaService } from "../prisma.service";
import { PrismaCompanyMapper } from "../mapper/prisma-company.mapper";

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prismService: PrismaService) {}
  async create(entity: Company): Promise<Company | null> {
    const raw = PrismaCompanyMapper.toPrisma(entity);

    const company = await this.prismService.company.create({
      data: raw,
    });

    if (company) {
      return PrismaCompanyMapper.toDomain(company);
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
