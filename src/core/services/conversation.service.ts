import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationRepository } from "../repositories/conversation.repository";
import { Conversation } from "../entities/conversation";

@Injectable()
export class ConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  async createConversation(
    createConversationDto: CreateConversationDto
  ): Promise<Conversation> {
    const conversation = new Conversation();

    conversation.is_group = createConversationDto.is_group;

    const newConversation = await this.conversationRepository.create(
      conversation
    );

    if (!newConversation) {
      throw new ConflictException("Conflito ao criar nova conversa");
    }
    return newConversation;
  }

  //   async findAll(): Promise<string> {
  //     return await this.userRepository.findAll();
  //   }

  //   async findOneByEmail(email: string): Promise<User> {
  //     const user = await this.userRepository.findOneByEmail(email);
  //     return user;
  //   }

  //   async findOneById(id: string): Promise<User> {
  //     const user = await this.userRepository.findOneById(id);
  //     return user;
  //   }
}
