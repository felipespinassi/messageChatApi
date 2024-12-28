import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/user";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      throw new ConflictException("Conflito ao criar do usuário");
    }

    return newUser;
  }

  async findAll(): Promise<string> {
    return await this.userRepository.findAll();
  }

  async findOne(username: string): Promise<string> {
    return await this.userRepository.findOne(username);
  }
}
