import { Company } from "src/core/entities/company";
import { ConversationUser } from "src/core/entities/conversationUser";

export class PrismaCompanyMapper {
  public static toPrisma(company: Company) {
    return {
      name: company.name,
      email: company.email,
      password: company.password,
      document: company.document,
    };
  }

  public static toDomain(rawCompany: any) {
    const company = new Company();
    company.id = rawCompany.id;
    company.name = rawCompany.name;
    company.email = rawCompany.email;
    company.password = rawCompany.password;
    company.document = rawCompany.document;
    company.createdAt = rawCompany.created_at;
    company.updatedAt = rawCompany.updated_at;

    return company;
  }
}
