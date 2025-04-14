import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { ConversationService } from "src/core/services/conversation.service";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";
import { ConversationDto } from "../dtos/conversation/conversation.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { ConversationUserMessageDto } from "../dtos/conversation/conversation-user-message.dto";
import { ConversationUserMessagesDto } from "../dtos/conversation/conversation-user-messages.dto";

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
      conversation.isGroup,
      conversation.name
    );

    return newConversation;
  }

  @ApiOkResponse({ type: ConversationUserMessageDto })
  @Get()
  async findAll(@Req() req) {
    const conversation = await this.conversationService.findAll(req.user);

    return conversation;
  }

  @ApiOkResponse({ type: ConversationUserMessagesDto })
  @Get("user/:id")
  async findOneByUserId(@Req() req, @Param("id", ParseIntPipe) id: number) {
    return this.conversationService.findOneByUserId(req.user, id);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.conversationService.findById(id);
  }
}
