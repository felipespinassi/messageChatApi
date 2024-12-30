import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "src/core/services/auth.service";
import { SignInDto } from "../dtos/auth/sign-in.dto";
import { Public } from "../decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post("sign-up")
  signUp(@Body() payload) {
    return this.authService.signUp(payload);
  }
}
