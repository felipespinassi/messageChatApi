import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { Public } from "../decorators/public.decorator";
import { ConversationService } from "src/core/services/conversation.service";

@Controller("/conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Public()
  @Post()
  async createUser(@Body() createConversationDto: any) {
    const newConversation = await this.conversationService.createConversation(
      createConversationDto
    );

    return newConversation;
  }

  //   @Get()
  //   async findAll(): Promise<string> {
  //     return this.userService.findAll();
  //   }

  //   @Get("/:id")
  //   async findOneById(@Param() id: { id: string }): Promise<User> {
  //     return this.userService.findOneById(id.id);
  //   }
}
