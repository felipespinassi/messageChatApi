import { ConversationUser } from "../entities/conversationUser";

export abstract class ConversationUserRepository {
  abstract create(entity: ConversationUser): Promise<ConversationUser | null>;
}
