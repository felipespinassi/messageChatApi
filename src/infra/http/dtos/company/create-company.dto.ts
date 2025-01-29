import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  password: string;
}
