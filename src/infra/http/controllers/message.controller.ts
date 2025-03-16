import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ConversationService } from "src/core/services/conversation.service";
import { MessageService } from "src/core/services/message.service";
import { Public } from "../decorators/public.decorator";
import { CreateMessageDto } from "../dtos/message/create-message.dto";

@Controller("/message")
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body(new ValidationPipe()) createConversationDto: CreateMessageDto
  ) {
    const newConversation = await this.messageService.createMessage(
      createConversationDto
    );

    return newConversation;
  }

  //   @Get("/:id")
  //   async findOneById(@Param() id: { id: string }): Promise<User> {
  //     return this.userService.findOneById(id.id);
  //   }

  @Get()
  findAll(@Query("userId") userId: string) {
    return this.messageService.findAll(userId);
  }
}
