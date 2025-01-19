import { Message } from "../entities/message";

export abstract class MessageRepository {
  abstract create(entity: any): Promise<any | null>;
  abstract findAll(userId): any;
  //   abstract findOneByEmail(email: string): Promise<any | null>;
  //   abstract findOneById(id: string): Promise<any | null>;
}
