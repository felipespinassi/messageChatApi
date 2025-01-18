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
import { ApiOkResponse } from "@nestjs/swagger";
import { FilterConversationDto } from "../dtos/conversation/filter-conversation.dto";
import { ConversationUserMessageDto } from "../dtos/conversation/conversation-user-message.dto";

@Controller("/conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @ApiOkResponse({ type: ConversationDto })
  @Post()
  async createConversation(
    @Body(new ValidationPipe()) createConversationDto: CreateConversationDto
  ) {
    const conversation = await this.conversationService.create(
      createConversationDto
    );

    const newConversation = new ConversationDto(
      conversation.id,
      conversation.isGroup
    );

    return newConversation;
  }

  @ApiOkResponse({ type: ConversationUserMessageDto })
  @Get()
  async findAll(
    @Headers("Authorization") userToken,
    @Query(new ValidationPipe({ transform: true })) query: FilterConversationDto
  ) {
    const conversation = await this.conversationService.findAll(
      query,
      userToken
    );

    return conversation;
  }

  @Get("/:id")
  //adicionar logica de nao exibir conversas que nao pertence ao usuario logado
  async findOneById(@Param() id: { id: string }): Promise<any> {
    return this.conversationService.findOneById(id.id);
  }
}
