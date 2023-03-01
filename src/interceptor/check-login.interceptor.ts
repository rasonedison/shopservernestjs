import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

interface customHeader {
    authorization: string
  }
 
interface customReq {
  access_token: string
}

type customHeaderType = customHeader & Headers;
type customRequest = customReq & Request;

@Injectable()
export class IsLoginedInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 在这里进行请求的预处理或后处理
    const request: customRequest = context.switchToHttp().getRequest();
    const headers: customHeaderType = request.headers as customHeaderType;
    const jwtToken:string = headers.authorization?.split(' ')[1];
    // console.log(jwtToken);
    if(jwtToken && jwtToken != ''){
        try {
            const user = this.jwtService.verify(jwtToken);
            request.access_token = jwtToken;
            // 阻止请求进入控制器处理
            //return new Observable();
          } catch (error) {
            //console.log(error)
          }
    }else{
       // console.log('no token');
    }
    return next.handle();
  }
}