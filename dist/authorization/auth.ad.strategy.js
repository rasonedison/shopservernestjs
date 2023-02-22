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
exports.AzureADGuard = exports.AzureADStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_azure_ad_1 = require("passport-azure-ad");
const config_util_1 = require("../util/config.util");
let AzureADStrategy = class AzureADStrategy extends (0, passport_1.PassportStrategy)(passport_azure_ad_1.OIDCStrategy, 'azuread') {
    constructor() {
        super({
            identityMetadata: config_util_1.configUtil.getAzureADConfig('identityMetadata'),
            clientID: config_util_1.configUtil.getAzureADConfig('clientID'),
            redirectUrl: config_util_1.configUtil.getAzureADConfig('redirectUrl'),
            responseType: config_util_1.configUtil.getAzureADConfig('responseType'),
            responseMode: config_util_1.configUtil.getAzureADConfig('responseMode'),
            allowHttpForRedirectUrl: config_util_1.configUtil.getAzureADConfig('allowHttpForRedirectUrl'),
            passReqToCallback: config_util_1.configUtil.getAzureADConfig('passReqToCallback'),
            clientSecret: config_util_1.configUtil.getAzureADConfig('clientSecret'),
        });
    }
};
AzureADStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AzureADStrategy);
exports.AzureADStrategy = AzureADStrategy;
exports.AzureADGuard = (0, passport_1.AuthGuard)('azure-ad');
//# sourceMappingURL=auth.ad.strategy.js.map