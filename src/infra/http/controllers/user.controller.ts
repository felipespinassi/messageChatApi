import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "src/core/services/user.service";
import { CreateUserDto, createUserSchema } from "../dtos/user/create-user.dto";
import { ZodValidationPipe } from "../validators/zod-validation.pipe";
import { UserDto } from "../dtos/user/user.dto";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) createUserDto: CreateUserDto
  ) {
    const newUser = await this.userService.createUser(createUserDto);

    return new UserDto(newUser.id, newUser.name, newUser.email);
  }

  @Get()
  async findAll(): Promise<string> {
    return this.userService.findAll();
  }
}
