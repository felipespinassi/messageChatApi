import { ConversationUsersMessagesDto } from "src/infra/http/dtos/conversation/conversation-users-messages.dto";
import { Conversation } from "../entities/conversation";

export abstract class ConversationRepository {
  abstract create(entity: Conversation): Promise<Conversation | null>;
  abstract findAll(
    userId: number
  ): Promise<ConversationUsersMessagesDto[] | null>;
  abstract findByUserIds(userId1: number, userId2: number): any;
  abstract findOneById(id: string): Promise<any | null>;
}
