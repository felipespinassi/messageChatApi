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
import { ConversationUserService } from "src/core/services/conversationUser.service";
import { ApiQuery } from "@nestjs/swagger";

@Controller("/conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Public()
  @Post()
  async createConversation(@Body() createConversationDto: any) {
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

  //   @Get("/:id")
  //   async findOneById(@Param() id: { id: string }): Promise<User> {
  //     return this.userService.findOneById(id.id);
  //   }
}
