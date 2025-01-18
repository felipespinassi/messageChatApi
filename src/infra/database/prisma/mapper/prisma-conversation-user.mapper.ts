import { ConversationUser } from "src/core/entities/conversationUser";

export class PrismaConversationUserMapper {
  public static toPrisma(conversationUser: ConversationUser[]) {
    return conversationUser.map((conversationUser) => ({
      conversation_id: conversationUser.conversationId,
      user_id: conversationUser.userId,
    }));
  }

  public static toDomain(rawUser: any) {
    return rawUser.map((user) => {
      const conversationUser = new ConversationUser();
      conversationUser.conversationId = user.conversation_id;
      conversationUser.userId = user.user_id;
      return conversationUser;
    });
  }
}
