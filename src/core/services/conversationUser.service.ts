import { ConflictException, Injectable } from "@nestjs/common";
import { ConversationUserRepository } from "../repositories/conversationUser.repository";
import { ConversationUser } from "../entities/conversationUser";
import { CreateConversationUserDto } from "../dtos/conversationUser/create-conversation-user.dto";

@Injectable()
export class ConversationUserService {
  constructor(private conversationRepository: ConversationUserRepository) {}

  async create(
    createConversationUserDto: CreateConversationUserDto
  ): Promise<{ count: number }> {
    const linkedConversationUsers = createConversationUserDto.users.map(
      (userId) => {
        const conversationUser = new ConversationUser();
        conversationUser.conversationId =
          createConversationUserDto.conversationId;
        conversationUser.userId = userId;
        return conversationUser;
      }
    );

    const newConversationUser = await this.conversationRepository.create(
      linkedConversationUsers
    );

    if (!newConversationUser) {
      throw new ConflictException("Conflito ao criar nova conversa");
    }

    return newConversationUser;
  }
}
