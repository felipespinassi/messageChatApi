import { Conversation } from "src/core/entities/conversation";

export class PrismaConversationMapper {
  public static toPrisma(conversation: Conversation) {
    return {
      id: conversation.id,
      is_group: conversation.isGroup,
    };
  }

  public static toDomain(rawUser: any) {
    const user = new Conversation();

    user.isGroup = rawUser.is_group;
    user.id = rawUser.id;
    user.createdAt = rawUser.createdAt;
    user.updatedAt = rawUser.updatedAt;

    return user;
  }
}
