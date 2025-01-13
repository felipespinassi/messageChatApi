import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
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
  async findOneById(@Param() id: { id: string }): Promise<any> {
    return this.conversationService.findOneById(id.id);
  }
}
