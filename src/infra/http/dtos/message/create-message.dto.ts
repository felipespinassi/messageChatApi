import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  conversationId: string;

  @ApiProperty()
  userName: string;
}
