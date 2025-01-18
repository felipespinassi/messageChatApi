import { ConflictException, Injectable } from "@nestjs/common";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationRepository } from "../repositories/conversation.repository";
import { Conversation } from "../entities/conversation";
import { ConversationUserService } from "./conversationUser.service";
import { JwtService } from "@nestjs/jwt";

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

  async findAll(dto): Promise<{}> {
    const { userToken, userId } = dto;

    console.log(userToken);
    if (!userToken || !userToken.startsWith("Bearer ")) {
      throw new Error("Token não encontrado ou mal formatado");
    }

    const token = userToken.split(" ")[1];
    const user = this.jwtService.decode(token);
    if (user.id && userId) {
      const conversation = await this.conversationRepository.findByUserIds(
        user.id,
        Number(userId)
      );

      return {
        id: conversation.id,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        isGroup: conversation.isGroup,
        messages: conversation.messages,
        user: conversation.users.find((u) => u.id === Number(userId)),
      };
    }
    const conversations = await this.conversationRepository.findAll(user.id);

    return conversations.map((conversation) => {
      return {
        id: conversation.id,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        isGroup: conversation.isGroup,
        message: conversation.messages.pop(),
        user: conversation.users.find((u) => u.id !== user.id),
      };
    });
  }

  async findOneById(id: string): Promise<any> {
    const conversation = await this.conversationRepository.findOneById(id);
    return conversation;
  }
}
