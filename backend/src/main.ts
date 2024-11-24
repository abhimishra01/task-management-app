import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import {
  RequestTransformerPipe,
  ResponseTransformInterceptor,
} from './interceptors';
import { ALLOW_METHODS, ALLOW_ORIGINS } from './utils/constants';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(), new RequestTransformerPipe());
  app.enableCors({
    origin: ALLOW_ORIGINS,
    methods: ALLOW_METHODS,
  });

  const config = new DocumentBuilder()
    .setTitle('Task Management System API')
    .setDescription('API documentation for Task Management App')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  // @ts-ignore
  const document = SwaggerModule.createDocument(app, config);
  // @ts-ignore
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log('Application is running on http://localhost:3000');
}
bootstrap();
