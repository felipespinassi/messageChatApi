import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationRepository } from "../repositories/conversation.repository";
import { Conversation } from "../entities/conversation";
import { ConversationUserService } from "./conversationUser.service";
import { MessageService } from "./message.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ConversationService {
  constructor(
    private conversationRepository: ConversationRepository,
    private conversationUserService: ConversationUserService,
    private jwtService: JwtService
  ) {}

  async createConversation(createConversationDto: any): Promise<any> {
    const conversation = new Conversation();

    conversation.is_group = createConversationDto.is_group;

    const newConversation = await this.conversationRepository.create(
      conversation
    );

    if (!newConversation) {
      throw new ConflictException("Conflito ao criar nova conversa");
    }

    const conversationUser =
      await this.conversationUserService.createConversation({
        user_id: createConversationDto.user_id,
        conversation_id: newConversation.id,
      });

    return { conversationUser, newConversation };
  }

  async findAll(authHeader): Promise<string> {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Token não encontrado ou mal formatado");
    }

    const token = authHeader.split(" ")[1]; // Remove o prefixo "Bearer"
    const user = this.jwtService.decode(token); // Decodifica o token sem verificar a assinatura
    return await this.conversationRepository.findAll(user.id);
  }

  async findOneById(id: string): Promise<any> {
    const conversation = await this.conversationRepository.findOneById(id);
    return conversation;
  }
}
