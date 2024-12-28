import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(username: string) {
    const user = await this.usersService.findOne(username);

    return user;
  }
}
