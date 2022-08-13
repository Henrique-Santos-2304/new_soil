import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModule } from '@core/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerModule(app) // Config Swagger api

  await app.listen(3308);
}
bootstrap();
