import { UserDto } from "../user/user.dto";

export class ConversationDto {
  id: number;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
  message: {};
  user: UserDto;

  constructor(
    id: number,
    isGroup: boolean,
    createdAt: Date,
    updatedAt: Date,
    message: {},
    user: UserDto
  ) {
    this.id = id;
    this.isGroup = isGroup;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.message = message;
    this.user = user;
  }
}
