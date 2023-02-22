"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const index_controller_1 = require("./index/index.controller");
const index_service_1 = require("./index/index.service");
const user_module_1 = require("./user/user.module");
const authorization_module_1 = require("./authorization/authorization.module");
const order_module_1 = require("./order/order.module");
const assets_module_1 = require("./assets/assets.module");
const config_util_1 = require("./util/config.util");
const custom_log_1 = require("./Log/custom.log");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(config_util_1.configUtil.getDBConfigUrl(false), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            user_module_1.UserModule,
            authorization_module_1.AuthorizationModule,
            order_module_1.OrderModule,
            assets_module_1.AssetsModule,
        ],
        controllers: [index_controller_1.IndexController],
        providers: [index_service_1.IndexService, common_1.Logger, custom_log_1.LogService],
        exports: [common_1.Logger, custom_log_1.LogService]
    })
], AppModule);
exports.AppModule = AppModule;
mongoose.set('debug', config_util_1.configUtil.getMongoPrintLog());
//# sourceMappingURL=app.module.js.map