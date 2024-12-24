import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UniqueConstraintExceptionFilter } from "./exception-filters/unique-constraint-exception-filter/unique-constraint-exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new UniqueConstraintExceptionFilter());
  await app.listen(3000);
}
bootstrap();
