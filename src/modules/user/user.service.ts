import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  async findOneById(id: number): Promise<User> {
    if (typeof id === "number" && !isNaN(id) && id > 0) {
      const user = await this.userRepository.findUserById(id);
      return user;
    }

    throw new HttpException(
      "Invalid Id, it must be a positive integer!",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async updateUser(id: number, partialUser: Partial<User>) {
    if (typeof id === "number" && !isNaN(id) && id > 0) {
      return await this.userRepository.updateUserById(id, partialUser);
    }
    throw new HttpException(
      "Invalid Id, it must be a positive integer!",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async deleteUser(id: number) {
    if (typeof id === "number" && !isNaN(id) && id > 0) {
      return await this.userRepository.deleteUserById(id);
    }
    throw new HttpException(
      "Invalid Id, it must be a positive integer!",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
