import { Conversation } from "../entities/conversation";

export abstract class ConversationRepository {
  abstract create(entity: Conversation): Promise<Conversation | null>;
  abstract findAll(userId: number): Promise<Conversation[] | null>;
  abstract findByUserIds(
    userId1: number,
    userId2: number
  ): Promise<Conversation | null>;
  abstract findOneById(id: string): Promise<any | null>;
}
