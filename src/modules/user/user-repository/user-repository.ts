import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user/user";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserDto } from "../dtos/user-dto/user-dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDTO: UserDto): Promise<User> {
    const user = this.userRepository.create(userDTO);
    await this.userRepository.save(user);
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
