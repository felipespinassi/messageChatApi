import { ConflictException, Injectable } from "@nestjs/common";
import { ConversationUserRepository } from "../repositories/conversationUser.repository";
import { ConversationUser } from "../entities/conversationUser";

@Injectable()
export class ConversationUserService {
  constructor(private conversationRepository: ConversationUserRepository) {}

  async createConversation(
    createConversationUserDto: any
  ): Promise<ConversationUser> {
    const conversationUser = new ConversationUser();

    conversationUser.user_id = createConversationUserDto.user_id;
    conversationUser.conversation_id =
      createConversationUserDto.conversation_id;

    const newConversationUser = await this.conversationRepository.create(
      conversationUser
    );

    if (!newConversationUser) {
      throw new ConflictException("Conflito ao criar nova conversa");
    }

    return newConversationUser;
  }
}
