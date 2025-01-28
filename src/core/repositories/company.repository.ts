import { Company } from "../entities/company";

export abstract class CompanyRepository {
  abstract create(entity: Company): Promise<Company | null>;
  abstract findAll(): Promise<Company[] | null>;
  abstract findOneByEmail(email: string): Promise<any | null>;
  abstract findOneById(id: number): Promise<any | null>;
}
