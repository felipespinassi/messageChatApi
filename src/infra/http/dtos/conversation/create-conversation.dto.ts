import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, isString } from "class-validator";

export class CreateConversationDto {
  @ApiProperty()
  @IsBoolean()
  isGroup: boolean;

  @ApiProperty({
    type: [Number],
    isArray: true,
    example: [1, 2],
    description: "Array of two user IDs participating in the conversation",
  })
  @IsNumber({}, { each: true })
  users: number[];

  @ApiProperty()
  name?: string;
}
