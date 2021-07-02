import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import path from 'path';
import YAML from 'yamljs';
import { INestApplication } from '@nestjs/common';
import 'reflect-metadata';
import { uncaughtException, unhandledRejection } from './common/logger';
import { AppModule } from './app.module';

process.on('uncaughtException', uncaughtException)
process.on('unhandledRejection',unhandledRejection)

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
    
  SwaggerModule.setup('doc', app, swaggerDocument) 
  return app
}

export default  bootstrap;
