import { Conversation } from "src/core/entities/conversation";

export class PrismaConversationUsersMessagesMapper {
  public static toPrisma(conversation: Conversation) {
    return {
      id: conversation.id,
      is_group: conversation.isGroup,
    };
  }

  public static toDomain(rawUser: any) {
    return {
      id: rawUser.id,
      isGroup: rawUser.is_group,
      createdAt: rawUser.created_at,
      updatedAt: rawUser.updated_at,
      messages: rawUser.messages.map((message) => {
        return {
          id: message.id,
          content: message.content,
          userId: message.user_id,
          sentAt: message.sent_at,
          type: message.type,
        };
      }),
      users: rawUser.users.map((u) => u.user),
    };
  }
}
