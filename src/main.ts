import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'; 
import { AppModule } from './app.module';
import { LogUtil } from './util/log.config.util'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const instance: winston.Logger = LogUtil.createLogInstance;

  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
      instance
    })
  });
  await app.listen(80);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
}
bootstrap();
