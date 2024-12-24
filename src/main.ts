import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UniqueConstraintExceptionFilter } from "./exception-filters/unique-constraint-exception-filter/unique-constraint-exception-filter";
import { EntityNotFoundExceptionFilter } from "./exception-filters/entity-not-found-exception-filter/entity-not-found-exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UniqueConstraintExceptionFilter());
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
