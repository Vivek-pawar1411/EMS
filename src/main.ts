import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(multer().any());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
