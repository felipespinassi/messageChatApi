import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { Company } from "src/core/entities/company";
import { CompanyService } from "src/core/services/company.service";
import { CreateCompanyDto } from "../dtos/company/create-company.dto";

@Controller("/company")
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) companyDto: CreateCompanyDto
  ): Promise<Company> {
    return await this.companyService.create(companyDto);
  }
}
