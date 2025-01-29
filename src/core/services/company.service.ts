import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CompanyRepository } from "../repositories/company.repository";
import { Company } from "../entities/company";
import { CreateCompanyDto } from "../dtos/company/create-company.dto";

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async create(companyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();

    company.name = companyDto.name;
    company.email = companyDto.email;
    company.password = companyDto.password;
    company.document = companyDto.document;

    const newCompany = await this.companyRepository.create(company);

    if (!newCompany) {
      throw new BadRequestException("Company could not be created");
    }
    return newCompany;
  }
}
