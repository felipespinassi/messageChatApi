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

    if (conversationExists) {
      throw new Error("Conversa já existe");
    }

    const conversation = new Conversation();
    conversation.isGroup = createConversationDto.isGroup;

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
    return conversations
      .map((conversation) => {
        const otherUser = conversation.users?.find(
          (u) => u.id !== userFromToken.id
        );
        if (!otherUser) return null;
        return {
          id: conversation.id,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
          isGroup: conversation.isGroup,
          message: conversation.messages?.pop() || {},
          user: otherUser,
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
      user: conversation.users?.find((u) => u.id === id) as {
        id: number;
        name: string;
        email: string;
      },
    };
  }

  async findOneById(id: string): Promise<any> {
    const conversation = await this.conversationRepository.findOneById(id);
    return conversation;
  }
}
