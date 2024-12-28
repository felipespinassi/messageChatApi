import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(entity: User): Promise<User | null>;
  abstract findAll(): Promise<any | null>;
  abstract findOne(username: string): Promise<any | null>;
}
