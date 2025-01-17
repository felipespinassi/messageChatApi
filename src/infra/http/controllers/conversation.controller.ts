import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ConversationService } from "src/core/services/conversation.service";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationDto } from "../dtos/conversation/conversation.dto";

@Controller("/conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post()
  async createConversation(
    @Body(new ValidationPipe()) createConversationDto: CreateConversationDto
  ) {
    const conversation = await this.conversationService.createConversation(
      createConversationDto
    );

    const newConversation = new ConversationDto(
      conversation.id,
      conversation.isGroup,
      conversation.createdAt,
      conversation.updatedAt,
      conversation.message,
      conversation.user
    );

    return newConversation;
  }

  @Get()
  async findAll(
    @Headers("Authorization") authHeader,
    @Query("user") user
  ): Promise<any> {
    const dto = {
      user_id: user,
      authHeader,
    };

    return this.conversationService.findAll(dto);
  }

  @Get("/:id")
  //adicionar logica de nao exibir conversas que nao pertence ao usuario logado
  async findOneById(@Param() id: { id: string }): Promise<any> {
    return this.conversationService.findOneById(id.id);
  }
}
