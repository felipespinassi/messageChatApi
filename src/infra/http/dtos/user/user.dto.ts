import { UserType } from "src/core/enums/userType";

export class UserDto {
  id: number;
  email: string;
  name: string;
  type: UserType;
  companyId: number;

  constructor(
    id: number,
    email: string,
    name: string,
    type: UserType,
    companyId: number
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.type = type;
    this.companyId = companyId;
  }
}
