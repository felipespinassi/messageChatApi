import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dtos/auth/sign-in.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    SigninDto: SignInDto
  ): Promise<{ user: any; access_token: string }> {
    const { email, password } = SigninDto;

    const user = await this.userService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
