import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ConversationService } from "src/core/services/conversation.service";
import { MessageService } from "src/core/services/message.service";
import { Public } from "../decorators/public.decorator";

@Controller("/message")
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Public()
  @Post()
  async createMessage(@Body() createConversationDto: any) {
    const newConversation = await this.messageService.createMessage(
      createConversationDto
    );

    return newConversation;
  }

  //   @Get()
  //   async findAll(@Query("user") userId): Promise<string> {
  //     return this.messageService.findAll(Number(userId));
  //   }

  //   @Get("/:id")
  //   async findOneById(@Param() id: { id: string }): Promise<User> {
  //     return this.userService.findOneById(id.id);
  //   }
}
