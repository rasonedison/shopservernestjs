"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
const log_config_util_1 = require("./util/log.config.util");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const instance = log_config_util_1.LogUtil.createLogInstance;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            instance
        })
    });
    await app.listen(80);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
}
bootstrap();
//# sourceMappingURL=main.js.map