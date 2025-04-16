import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class ConversationDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsBoolean()
  isGroup: boolean;

  @ApiProperty()
  @IsString()
  name?: string;

  constructor(id: string, isGroup: boolean, name: string = "") {
    this.id = id;
    this.isGroup = isGroup;
    this.name = name;
  }
}
