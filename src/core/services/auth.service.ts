import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dtos/auth/sign-in.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(SigninDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = SigninDto;
    const user = await this.userService.findOneByEmail(email);

    const payload = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
