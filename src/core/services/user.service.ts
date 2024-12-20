import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user): Promise<string> {
    return await this.userRepository.create(user);
  }

  async findAll(): Promise<string> {
    return await this.userRepository.findAll();
  }
}
