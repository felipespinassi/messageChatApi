import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(entity: User): Promise<User | null>;
  abstract findAll(): Promise<any | null>;
  abstract findOneByEmail(email: string): Promise<any | null>;
}
