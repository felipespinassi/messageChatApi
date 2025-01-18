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

  @Get()
  async findAll(
    @Headers("Authorization") userToken,
    @Query("user") user
  ): Promise<any> {
    const dto = {
      user_id: user,
      userToken,
    };

    return this.conversationService.findAll({ user_id: user, userToken });
  }

  @Get("/:id")
  //adicionar logica de nao exibir conversas que nao pertence ao usuario logado
  async findOneById(@Param() id: { id: string }): Promise<any> {
    return this.conversationService.findOneById(id.id);
  }
}
