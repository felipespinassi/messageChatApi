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

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new ConflictException("Nenhum usuário encontrado");
    }
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new ConflictException("Nenhum usuário encontrado");
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new ConflictException("Nenhum usuário encontrado");
    }
    return user;
  }
}
