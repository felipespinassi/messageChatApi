import { ApiProperty } from "@nestjs/swagger";

export class CreateConversationDto {
  @ApiProperty()
  is_group: boolean;

  @ApiProperty({
    type: [Number],
    isArray: true,
    example: [1, 2],
    description: "Array of two user IDs participating in the conversation",
  })
  user_id: number[];
}
