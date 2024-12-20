export abstract class UserRepository {
  abstract create(entity: any): Promise<any | null>;
  abstract findAll(): Promise<any | null>;
}
