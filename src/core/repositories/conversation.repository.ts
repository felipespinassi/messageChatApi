import { Conversation } from "../entities/conversation";
import { ConversationUsersMessages } from "../entities/conversation-messages-users.entity";

export abstract class ConversationRepository {
  abstract create(entity: Conversation): Promise<Conversation | null>;
  abstract findAll(userId: number): Promise<ConversationUsersMessages[] | null>;
  abstract findByUserIds(
    userId1: number,
    userId2: number
  ): Promise<ConversationUsersMessages | null>;
  abstract findOneById(id: string): Promise<any | null>;
}
