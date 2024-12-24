import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { StandardResponse } from "../../utils/standard-response/standard-response";

export class UniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const detail = (exception as any).detail || "Erro no banco de dados!";

    if (exception.code === "23505") {
      return response
        .status(HttpStatus.CONFLICT)
        .json(
          new StandardResponse(
            { statusCode: HttpStatus.CONFLICT, detail },
            "A entidade já existe",
            true,
          ),
        );
    }

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        new StandardResponse([], "Erro inesperado no banco de dados", true),
      );
  }
}
