import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import path from 'path';
import YAML from 'yamljs';
import { INestApplication } from '@nestjs/common';
import 'reflect-metadata';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { uncaughtException, unhandledRejection } from './common/logger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { USE_FASTIFY } from './common/config';

process.on('uncaughtException', uncaughtException)
process.on('unhandledRejection',unhandledRejection)

async function bootstrap(): Promise<INestApplication> {
  let app;
  if(USE_FASTIFY) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
    SwaggerModule.setup('api', app, swaggerDocument);

  } else {
    app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
      
    SwaggerModule.setup('doc', app, swaggerDocument) 
  }

  return app
}

export default  bootstrap;
