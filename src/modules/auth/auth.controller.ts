import { Controller, Get } from "@nestjs/common";
import { StandardResponse } from "../utils/standard-response/standard-response";

@Controller("auth")
export class AuthController {
  @Get("/")
  healthCheck() {
    return new StandardResponse([], "Server is up and running!", false);
  }
}
