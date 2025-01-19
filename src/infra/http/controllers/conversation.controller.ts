import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { ConversationService } from "src/core/services/conversation.service";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationDto } from "../dtos/conversation/conversation.dto";
import { ApiOkResponse } from "@nestjs/swagger";
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
  async findAll(@Headers("Authorization") userToken) {
    const conversation = await this.conversationService.findAll(userToken);

    return conversation;
  }

  @Get("user/:id")
  //adicionar logica de nao exibir conversas que nao pertence ao usuario logado
  async findOneByUserId(
    @Headers("Authorization") userToken,
    @Param() id: { id: string }
  ): Promise<any> {
    return this.conversationService.findOneByUserId(userToken, id.id);
  }
}
