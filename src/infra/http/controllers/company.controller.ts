import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { Company } from "src/core/entities/company";
import { CompanyService } from "src/core/services/company.service";
import { CreateCompanyDto } from "../dtos/company/create-company.dto";
import { Public } from "../decorators/public.decorator";

@Controller("/company")
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @Public()
  async create(
    @Body(new ValidationPipe()) companyDto: CreateCompanyDto
  ): Promise<Company> {
    return await this.companyService.create(companyDto);
  }
}
