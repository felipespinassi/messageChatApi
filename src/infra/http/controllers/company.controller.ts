import { Body, Controller, Post } from "@nestjs/common";
import { Company } from "src/core/entities/company";
import { CompanyService } from "src/core/services/company.service";

@Controller("/company")
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async create(@Body() companyDto: Company): Promise<Company> {
    return await this.companyService.create(companyDto);
  }
}
