import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(404).json({
      statusCode: 404,
      message: "Entity not found",
      error: exception.message,
    });
  }
}
