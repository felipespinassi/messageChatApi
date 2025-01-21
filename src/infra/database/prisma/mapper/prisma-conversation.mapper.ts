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
      messages: rawConversation.messages?.map((message) => {
        return {
          id: message.id,
          content: message.content,
          userId: message.user_id,
          sentAt: message.sent_at,
          type: message.type,
        };
      }),
      users: rawConversation.users?.map((u) => u.user),
      createdAt: rawConversation.created_at,
      updatedAt: rawConversation.updated_at,
    };
  }
}
