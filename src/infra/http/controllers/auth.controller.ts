import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "src/core/services/auth.service";
import { SignInDto, signInSchema } from "../dtos/auth/sign-in.dto";
import { Public } from "../decorators/public.decorator";
import { ZodValidationPipe } from "../validators/zod-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body(new ZodValidationPipe(signInSchema)) signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
