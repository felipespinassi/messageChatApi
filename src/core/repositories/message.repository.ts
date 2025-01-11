import { Message } from "../entities/message";

export abstract class MessageRepository {
  abstract create(entity: Message): Promise<Message | null>;
  abstract findAll(userId): any;
  //   abstract findOneByEmail(email: string): Promise<any | null>;
  //   abstract findOneById(id: string): Promise<any | null>;
}
