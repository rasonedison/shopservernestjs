"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModule = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("./authorization.service");
const authorization_controller_1 = require("./authorization.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const auth_strategy_1 = require("./auth.strategy");
const auth_ad_strategy_1 = require("./auth.ad.strategy");
const jwt_auth_guard_1 = require("./jwt.auth.guard");
const core_1 = require("@nestjs/core");
const check_login_interceptor_1 = require("../interceptor/check-login.interceptor");
const config_util_1 = require("../util/config.util");
const azure_ad_state_1 = require("../middleware/azure.ad.state");
const axios_1 = require("@nestjs/axios");
let AuthorizationModule = class AuthorizationModule {
    configure(consumer) {
        consumer
            .apply(azure_ad_state_1.AzureADState)
            .forRoutes('/auth/azurelogin');
    }
};
AuthorizationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'azuread',
            }),
            jwt_1.JwtModule.register({
                secret: config_util_1.configUtil.getJWTSecrect(),
                signOptions: { expiresIn: '600s' },
            }),
            axios_1.HttpModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_entity_1.User.name, schema: user_entity_1.UsersSchema }]),
        ],
        controllers: [authorization_controller_1.AuthorizationController],
        providers: [authorization_service_1.AuthorizationService,
            user_service_1.UserService,
            auth_strategy_1.AuthStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            auth_ad_strategy_1.AzureADStrategy, auth_ad_strategy_1.AzureADGuard,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: check_login_interceptor_1.IsLoginedInterceptor,
            },],
        exports: [authorization_service_1.AuthorizationService, jwt_auth_guard_1.JwtAuthGuard, auth_ad_strategy_1.AzureADStrategy],
    })
], AuthorizationModule);
exports.AuthorizationModule = AuthorizationModule;
//# sourceMappingURL=authorization.module.js.map