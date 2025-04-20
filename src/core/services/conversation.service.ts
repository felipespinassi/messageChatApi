import { ConflictException, Injectable } from "@nestjs/common";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationRepository } from "../repositories/conversation.repository";
import { Conversation } from "../entities/conversation";
import { ConversationUserService } from "./conversationUser.service";
import { JwtService } from "@nestjs/jwt";
import { ConversationUserMessageDto } from "../dtos/conversation/conversation-user-message.dto";
import { ConversationUserMessagesDto } from "../dtos/conversation/conversation-user-messages.dto";

@Injectable()
export class ConversationService {
  constructor(
    private conversationRepository: ConversationRepository,
    private conversationUserService: ConversationUserService,
    private jwtService: JwtService
  ) {}

  async create(
    createConversationDto: CreateConversationDto
  ): Promise<Conversation> {
    const conversationExists = await this.conversationRepository.findByUserIds(
      createConversationDto.users[0],
      createConversationDto.users[1]
    );

    if (conversationExists && !createConversationDto.isGroup) {
      throw new Error("Conversa já existe");
    }

    const conversation = new Conversation();
    conversation.isGroup = createConversationDto.isGroup;
    conversation.name;

    const newConversation = await this.conversationRepository.create(
      conversation
    );

    if (!newConversation) {
      throw new ConflictException("Conflito ao criar nova conversa");
    }

    await this.conversationUserService.create({
      users: createConversationDto.users,
      conversationId: newConversation.id,
    });

    return newConversation;
  }

  async findAll(userFromToken: any): Promise<ConversationUserMessageDto[]> {
    const conversations = await this.conversationRepository.findAll(
      userFromToken.id
    );

    if (!conversations) {
      throw new ConflictException("Conflito ao buscar conversas");
    }

    console.log(conversations);
    return conversations
      .map((conversation) => {
        return {
          id: conversation.id,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
          isGroup: conversation.isGroup,
          message: conversation.messages?.pop() || {},
          users:
            conversation.users?.map((u) => {
              return u;
            }) || [],
          name: conversation.name || null,
        };
      })
      .filter((conversation) => conversation !== null);
  }

  async findOneByUserId(
    userFromToken,
    id: number
  ): Promise<ConversationUserMessagesDto> {
    const conversation = await this.conversationRepository.findByUserIds(
      userFromToken.id,
      id
    );

    if (!conversation) {
      throw new ConflictException("Conflito ao buscar conversa");
    }

    return {
      id: conversation.id,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      isGroup: conversation.isGroup,
      messages: conversation.messages || [],
      users:
        conversation.users?.map((u) => {
          return u;
        }) || [],
      name: conversation.name || null,
    };
  }

  async findById(id: string): Promise<any> {
    const conversation = await this.conversationRepository.findById(id);
    return conversation;
  }
}
