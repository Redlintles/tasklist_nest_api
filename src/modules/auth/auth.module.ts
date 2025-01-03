import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UtilsModule } from "../utils/utils.module";

@Module({
  imports: [UtilsModule],
  controllers: [AuthController],
})
export class AuthModule {}
