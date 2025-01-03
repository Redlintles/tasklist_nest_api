import { Module } from "@nestjs/common";
import { StandardErrorResponse } from "./standard-error-response/standard-error-response";
import { StandardResponse } from "./standard-response/standard-response";
import { UtilsService } from "./utils.service";

@Module({
  providers: [StandardErrorResponse, StandardResponse, UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
