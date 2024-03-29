import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'; 
import { AppModule } from './app.module';
import { LogUtil } from './util/log.config.util'
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './filter/all.exception.filter';

async function bootstrap() {

  const instance: winston.Logger = LogUtil.createLogInstance;

  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
      instance
    })
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(80);
 
}
bootstrap();
