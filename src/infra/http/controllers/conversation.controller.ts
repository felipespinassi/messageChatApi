import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { ConversationService } from "src/core/services/conversation.service";
import { ApiQuery } from "@nestjs/swagger";
import { CreateConversationDto } from "../dtos/conversation/create-conversation.dto";

@Controller("/conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post()
  async createConversation(
    @Body(new ValidationPipe()) createConversationDto: CreateConversationDto
  ) {
    const newConversation = await this.conversationService.createConversation(
      createConversationDto
    );

    return newConversation;
  }

  @Get()
  @ApiQuery({
    name: "user",
    required: false,
    description: "ID do usuário para filtrar conversas",
  })
  async findAll(@Query("user") userId): Promise<string> {
    return this.conversationService.findAll(Number(userId));
  }

  @Get("/:id")
  async findOneById(@Param() id: { id: string }): Promise<any> {
    return this.conversationService.findOneById(id.id);
  }
}
