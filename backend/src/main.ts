import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

dotenv.config();

import { AppModule } from './app.module';
import {
  RequestTransformerPipe,
  ResponseTransformInterceptor,
} from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(), new RequestTransformerPipe());
  app.enableCors({
    origin: [
      'http://localhost:3002',
      'http://localhost',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 3000);
  Logger.log('Application is running on http://localhost:3000');
}
bootstrap();
