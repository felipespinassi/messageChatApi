import { Conversation } from "../entities/conversation";

export abstract class ConversationRepository {
  abstract create(entity: Conversation): Promise<Conversation | null>;
  //   abstract findAll(): Promise<any | null>;
  //   abstract findOneByEmail(email: string): Promise<any | null>;
  //   abstract findOneById(id: string): Promise<any | null>;
}
