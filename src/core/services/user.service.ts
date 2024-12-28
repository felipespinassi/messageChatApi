import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user";
import { CreateUserDto } from "../dtos/user/create-user.dto";

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    return user;
  }
}
