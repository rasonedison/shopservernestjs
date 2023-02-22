import { UserService } from '../user/user.service';
declare const AuthStrategy_base: new (...args: any[]) => any;
export declare class AuthStrategy extends AuthStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: any, header: Headers): Promise<import("../user/entities/user.entity").User>;
}
export {};
