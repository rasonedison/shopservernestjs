import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
export declare class IsLoginedInterceptor implements NestInterceptor {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
