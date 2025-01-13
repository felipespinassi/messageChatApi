import { Conversation } from "../entities/conversation";

export abstract class ConversationRepository {
  abstract create(entity: Conversation): Promise<Conversation | null>;
  abstract findByUserIds(userId1: number, userId2: number): any;
  abstract findAll(userId: number): Promise<any>;
  //   abstract findOneByEmail(email: string): Promise<any | null>;
  abstract findOneById(id: string): Promise<any | null>;
}
