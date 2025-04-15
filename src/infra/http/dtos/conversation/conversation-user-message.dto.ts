import { ApiProperty } from "@nestjs/swagger";

export class ConversationUserMessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isGroup: boolean;
  @ApiProperty()
  message: {};
  @ApiProperty()
  users: [];

  createdAt: Date;
  updatedAt: Date;

  constructor(conversation) {
    this.id = conversation.id;
    this.isGroup = conversation.isGroup;
    this.message = conversation.message;
    this.users = conversation.users;
  }
}
