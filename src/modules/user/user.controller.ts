import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dtos/user-dto/user-dto";
import { StandardResponse } from "../../utils/standard-response/standard-response";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/")
  async createUser(@Body() userDTO: UserDto): Promise<StandardResponse> {
    const user = await this.userService.createUser(userDTO);
    return new StandardResponse({ user: user }, "Usuário criado com sucesso!");
  }
}
