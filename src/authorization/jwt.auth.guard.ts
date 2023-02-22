import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard,} from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { type } from 'os';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req:Request = context.switchToHttp().getRequest();
    // console.log('JwtAuthGuard');
    // const headers: customHeaderType = req.headers as customHeaderType;
    // console.log(headers.authorization);
    // // if (req.user) {
    // //   throw new HttpException('已经登录', HttpStatus.CONFLICT);
    // // }
    return super.canActivate(context);
  }
}
