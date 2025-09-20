import { UserType } from "../enums/userType";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  type: UserType;
  companyId: number;
}
