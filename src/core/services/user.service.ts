import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  saltOrRounds = 10;

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const hashPass = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds
    );

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashPass;

    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      throw new ConflictException("Conflito ao criar do usuário");
    }

    return newUser;
  }

  async findAll(): Promise<string> {
    return await this.userRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    return user;
  }
}
