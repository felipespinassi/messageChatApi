import { Conversation } from "src/core/entities/conversation";

export class PrismaConversationMapper {
  public static toPrisma(conversation: Conversation) {
    return {
      id: conversation.id,
      is_group: conversation.isGroup,
    };
  }

  public static toDomain(rawConversation: any) {
    return {
      id: rawConversation.id,
      isGroup: rawConversation.is_group,
      createdAt: rawConversation.created_at,
      updatedAt: rawConversation.updated_at,
    };
  }
}
