import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "src/core/enums/userType";

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: UserType })
  type: UserType;

  @ApiProperty()
  companyId: number;
}
