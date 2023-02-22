"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsLoginedInterceptor = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let IsLoginedInterceptor = class IsLoginedInterceptor {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const jwtToken = (_a = headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (jwtToken && jwtToken != '') {
            try {
                const user = this.jwtService.verify(jwtToken);
                request.access_token = jwtToken;
            }
            catch (error) {
            }
        }
        else {
        }
        return next.handle();
    }
};
IsLoginedInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], IsLoginedInterceptor);
exports.IsLoginedInterceptor = IsLoginedInterceptor;
//# sourceMappingURL=check-login.interceptor.js.map