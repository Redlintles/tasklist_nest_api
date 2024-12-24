import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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

  @Get("/:id")
  async findUserById(@Param("id") id: number): Promise<StandardResponse> {
    const user = await this.userService.findOneById(id);
    if (user) {
      return new StandardResponse({ user }, "Usuário encontrado com sucesso!");
    } else {
      return new StandardResponse({}, "Usuário não encontrado!", true);
    }
  }
}
