import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { StandardErrorResponse } from "src/utils/standard-error-response/standard-error-response";

export class UniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const detail = (exception as any).detail || "Erro no banco de dados!";
    const error = new StandardErrorResponse(
      HttpStatus.CONFLICT,
      "Usuário já existe",
      detail,
    );
    console.log(error);
    if (exception.code === "23505") {
      return response.status(HttpStatus.CONFLICT).json(error.toClient());
    }

    error.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(error.toClient());
  }
}
