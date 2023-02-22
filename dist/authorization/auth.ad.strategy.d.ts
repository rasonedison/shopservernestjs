import { OIDCStrategy } from 'passport-azure-ad';
declare const AzureADStrategy_base: new (...args: any[]) => OIDCStrategy;
export declare class AzureADStrategy extends AzureADStrategy_base {
    constructor();
}
export declare const AzureADGuard: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export {};
