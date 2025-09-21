import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "src/core/services/user.service";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UserDto } from "../dtos/user/user.dto";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);

    return new UserDto(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.type,
      newUser.companyId
    );
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    const usersDto = users.map(
      (user) =>
        new UserDto(user.id, user.email, user.name, user.type, user.companyId)
    );

    return usersDto;
  }
  @Get(":id")
  async findOneById(@Param("id", ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);

    const userDto = new UserDto(
      user.id,
      user.email,
      user.name,
      user.type,
      user.companyId
    );
    return userDto;
  }
}
