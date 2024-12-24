import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { StandardErrorResponse } from "src/utils/standard-error-response/standard-error-response";
import { EntityNotFoundError } from "typeorm";

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = new StandardErrorResponse(
      HttpStatus.NOT_FOUND,
      "Entity not found!",
      exception.message,
    );

    console.log(error);

    return response.status(HttpStatus.NOT_FOUND).json(error.toClient());
  }
}
