import { ApiProperty } from "@nestjs/swagger";

export class ConversationUserMessagesDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isGroup: boolean;
  @ApiProperty()
  messages: [];
  @ApiProperty()
  users: [];

  createdAt: Date;
  updatedAt: Date;

  constructor(conversation) {
    this.id = conversation.id;
    this.isGroup = conversation.isGroup;
    this.messages = conversation.message;
    this.users = conversation.users;
  }
}
