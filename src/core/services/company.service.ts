import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CompanyRepository } from "../repositories/company.repository";
import { Company } from "../entities/company";
import { CreateCompanyDto } from "../dtos/company/create-company.dto";
import { UserService } from "./user.service";
import { UserType } from "../enums/userType";
import * as bcrypt from "bcrypt";
@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private userSevice: UserService,
  ) {}
  saltOrRounds = 10;

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

    const user = await this.userSevice.createUser({
      name: company.name,
      email: company.email,
      password: company.password,
      companyId: newCompany.id,
      type: UserType.MANAGER,
    });
    return newCompany;
  }
}
