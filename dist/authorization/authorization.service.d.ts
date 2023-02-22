import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
export declare class AuthorizationService {
    private userService;
    private jwtService;
    private httpService;
    constructor(userService: UserService, jwtService: JwtService, httpService: HttpService);
    validateUser(username: string, password: string): Promise<User>;
    generateJWT(user: any): Promise<{
        access_token: string;
    }>;
    getAzureLoginToken(_code: string): Promise<any>;
    getAzureUserInfo(_access_token: string): Promise<any>;
}
