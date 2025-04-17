import { Message } from "src/core/entities/message";
import { User } from "src/core/entities/user";

export class PrismamMessageMapper {
  public static toPrisma(message: Message) {
    return {
      content: message.content,
      user_id: message.userId,
      conversation_id: message.conversationId,
      type: message.type,
      user_name: message.userName,
    };
  }

  public static toDomain(rawMessage: any) {
    const message = new Message();

    message.id = rawMessage.id;
    message.content = rawMessage.content;
    message.userId = rawMessage.user_id;
    message.conversationId = rawMessage.conversation_id;
    message.type = rawMessage.type;
    message.userName = rawMessage.user_name;
    message.createdAt = rawMessage.created_at;
    message.updatedAt = rawMessage.updated_at;

    return message;
  }
}
