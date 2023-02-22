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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_auth_get_user_decorator_1 = require("../decorators/jwt.auth.get-user.decorator");
const check_login_interceptor_1 = require("../interceptor/check-login.interceptor");
const custom_log_1 = require("../Log/custom.log");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_entity_1 = require("../user/entities/user.entity");
const authorization_service_1 = require("./authorization.service");
const user_service_1 = require("../user/user.service");
let AuthorizationController = class AuthorizationController {
    constructor(authorizationService, logService, userService) {
        this.authorizationService = authorizationService;
        this.logService = logService;
        this.userService = userService;
    }
    async login(user, request) {
        if (request.access_token) {
            return { access_token: request.access_token };
        }
        const authenticatedUser = await this.authorizationService.validateUser(user.username, user.password);
        return this.authorizationService.generateJWT(authenticatedUser);
    }
    async azurelogin() { }
    async callback(req, response) {
        const aure_code = req.body.code;
        const access_token = await this.authorizationService.getAzureLoginToken(aure_code);
        const azure_user = await this.authorizationService.getAzureUserInfo(access_token);
        let user = await this.userService.findOne(azure_user.mail);
        if (!user) {
            user = await this.userService.create({ username: azure_user.mail, password: "azure123", azureid: azure_user.id });
        }
        const jwt_token = await this.authorizationService.generateJWT(user);
        response.cookie('jwt_token', jwt_token.access_token);
        response.status(200)
            .json({
            statusCode: common_1.HttpStatus.FOUND,
            message: 'Azure Login Success',
            data: jwt_token.access_token
        });
    }
    async protected(user, name) {
        this.logService.info('get protect api');
        return user;
    }
    async index(req) {
        console.log('index');
        return { msg: "hello" };
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseInterceptors)(check_login_interceptor_1.IsLoginedInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('azurelogin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('azuread')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "azurelogin", null);
__decorate([
    (0, common_1.Post)('azure'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "callback", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('protected/:name'),
    __param(0, (0, jwt_auth_get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "protected", null);
__decorate([
    (0, common_1.Post)('index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "index", null);
AuthorizationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService,
        custom_log_1.LogService,
        user_service_1.UserService])
], AuthorizationController);
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map