import { Injectable } from "@nestjs/common";
import { StandardResponse } from "./standard-response/standard-response";

@Injectable()
export class UtilsService {
  response(
    data: any,
    message: string,
    error: boolean = false,
  ): StandardResponse {
    return new StandardResponse(data, message, error);
  }
}
