import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const logger = new Logger();
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      //console.log(exception);
      let res: any = null;
      let status: number = 500;
        // exception instanceof HttpException
        //   ? exception.getResponse()
        //   : HttpStatus.INTERNAL_SERVER_ERROR;
      if( exception instanceof HttpException ){
        res = exception.getResponse()
        status = res.statusCode;
      }else{
        status = 500;
        res = { msg: "unknown error" }
      }

      const user: string = request.user ? request.user.username : "anonymous"

      const finalRes = {
        user,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...res
      }

      logger.error(finalRes);
      response.status(status).json(finalRes);
    }
  }