import { UserType } from "src/core/enums/userType";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: UserType;
  companyId: number;
}
