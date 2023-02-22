import { LogService } from 'src/Log/custom.log';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthorizationService } from './authorization.service';
import { UserService } from 'src/user/user.service';
export declare class AuthorizationController {
    private readonly authorizationService;
    private readonly logService;
    private userService;
    constructor(authorizationService: AuthorizationService, logService: LogService, userService: UserService);
    login(user: CreateUserDto, request: any): Promise<{
        access_token: any;
    }>;
    azurelogin(): Promise<void>;
    callback(req: any, response: any): Promise<void>;
    protected(user: User, name: string): Promise<User>;
    index(req: any): Promise<{
        msg: string;
    }>;
}
