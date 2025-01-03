import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user-repository/user-repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user/user";
import { UtilsModule } from "../utils/utils.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
