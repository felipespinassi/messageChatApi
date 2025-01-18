import { ApiProperty } from "@nestjs/swagger";

export class ConversationUserMessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isGroup: boolean;
  @ApiProperty()
  messages: [];
  @ApiProperty()
  user: [];

  constructor(conversation) {
    this.id = conversation.id;
    this.isGroup = conversation.isGroup;
    this.messages = conversation.messages;
    this.user = conversation.users;
  }
}
