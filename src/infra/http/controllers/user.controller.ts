import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "src/core/services/user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user): Promise<string> {
    return this.userService.createUser(user);
  }

  @Get()
  async FindAll(): Promise<string> {
    return this.userService.findAll();
  }
}
