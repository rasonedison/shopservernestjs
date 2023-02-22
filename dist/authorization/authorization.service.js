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
exports.AuthorizationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../user/user.service");
const config_util_1 = require("../util/config.util");
let AuthorizationService = class AuthorizationService {
    constructor(userService, jwtService, httpService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async validateUser(username, password) {
        const user = await this.userService.findOneWithPassword(username, password);
        if (!user) {
            console.log("username, password is wrong");
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    async generateJWT(user) {
        const payload = Object.assign(Object.assign({}, user), { sub: 123 });
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async getAzureLoginToken(_code) {
        const data = {
            client_id: config_util_1.configUtil.getAzureADConfig('clientID'),
            redirect_uri: config_util_1.configUtil.getAzureADConfig('redirectUrl'),
            grant_type: 'authorization_code',
            client_secret: config_util_1.configUtil.getAzureADConfig('clientSecret'),
            code: _code
        };
        try {
            const res = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post('https://login.microsoftonline.com/b901cb1b-9873-47c3-a927-2f4628111397/oauth2/v2.0/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).pipe((0, rxjs_1.map)((res) => res.data)));
            return res.access_token;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Unauthorized : Get Azure Access Token Error", `code: ${_code}`);
        }
    }
    async getAzureUserInfo(_access_token) {
        try {
            const res = await (0, rxjs_1.lastValueFrom)(this.httpService
                .get('https://graph.microsoft.com/v1.0/me', { headers: { 'Authorization': `Bearer ${_access_token}` } }).pipe((0, rxjs_1.map)((res) => res.data)));
            return res;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Unauthorized : Get Azure User Error", `Access Token: ${_access_token}`);
        }
    }
};
AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthorizationService);
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map