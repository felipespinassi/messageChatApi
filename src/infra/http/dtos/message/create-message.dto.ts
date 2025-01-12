import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  conversation_id: string;
}
