import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dtos/auth/sign-in.dto";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../dtos/user/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  saltOrRounds = 10;

  async signIn(SigninDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = SigninDto;

    const user = await this.userService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: CreateUserDto) {
    const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds);

    let data = {
      ...payload,
      password: hashPass,
    };

    return data;
  }
}
