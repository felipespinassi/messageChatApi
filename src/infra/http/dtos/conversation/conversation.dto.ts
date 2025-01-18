import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class ConversationDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsBoolean()
  isGroup: boolean;

  constructor(id: string, isGroup: boolean) {
    this.id = id;
    this.isGroup = isGroup;
  }
}
