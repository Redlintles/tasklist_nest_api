import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
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

    return new StandardResponse({ user }, "Usuário encontrado com sucesso!");
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: number): Promise<StandardResponse> {
    const user = await this.userService.deleteUser(id);
    return new StandardResponse({ user }, "Usuário deletado com sucesso!");
  }

  @Patch("/:id")
  async updateUser(
    @Param("id") id: number,
    @Body() partialUser: Partial<UserDto>,
  ): Promise<StandardResponse> {
    const result = await this.userService.updateUser(id, partialUser);
    return new StandardResponse(result, "Usuário atualizado com sucesso!");
  }
}
