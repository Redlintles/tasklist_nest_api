import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user-repository/user-repository";
import { User } from "./entities/user/user";
import { UserDto } from "./dtos/user-dto/user-dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: UserDto): Promise<User> {
    const user = await this.userRepository.createUser(userDto);

    return user;
  }
}
