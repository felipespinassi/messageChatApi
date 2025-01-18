import { ConversationUser } from "../entities/conversationUser";

export abstract class ConversationUserRepository {
  abstract create(
    entity: ConversationUser[]
  ): Promise<{ count: number } | null>;
}
