import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user/user";
import { Repository, UpdateResult } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "../dtos/user-dto/user-dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDTO: UserDto): Promise<User> {
    try {
      const user = this.userRepository.create(userDTO);
      await this.userRepository.save(user);
      return user;
    } catch {
      throw new HttpException(
        "Unique key constraint violation",
        HttpStatus.CONFLICT,
      );
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id });
      return user;
    } catch {
      throw new HttpException("EntityNotFound", HttpStatus.NOT_FOUND);
    }
  }

  async deleteUserById(id: number) {
    let user: User;
    try {
      user = await this.userRepository.findOneByOrFail({ id });
    } catch {
      throw new HttpException("EntityNotFound", HttpStatus.NOT_FOUND);
    }

    try {
      await this.userRepository.delete({ id });

      const exists = await this.userRepository.existsBy({ id });

      if (exists) {
        throw new Error("Entity Could not be deleted");
      } else {
        return user;
      }
    } catch {
      throw new HttpException(
        "An unexpected error ocurred, try again later",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserById(id: number, userData: Partial<User>) {
    let user: User;
    try {
      user = await this.userRepository.findOneByOrFail({ id });
    } catch {
      throw new HttpException("EntityNotFound", HttpStatus.NOT_FOUND);
    }

    try {
      const result: UpdateResult = await this.userRepository.update(
        { id },
        userData,
      );

      if (typeof result.affected !== "undefined" && result.affected === 0) {
        console.log("HERE");
        return {
          old: user,
          new: user,
        };
      } else if (
        typeof result.affected !== "undefined" &&
        result.affected > 0
      ) {
        const updatedUser: User = await this.userRepository.findOneBy({ id });
        return {
          old: user,
          new: updatedUser,
        };
      } else {
        console.log(result);
        throw new Error("Entity Could not be updated");
      }
    } catch {
      throw new HttpException(
        "An unexpected error ocurred, try again later",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
