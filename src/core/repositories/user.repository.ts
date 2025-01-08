import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(entity: User): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
  abstract findOneByEmail(email: string): Promise<any | null>;
  abstract findOneById(id: number): Promise<any | null>;
}
