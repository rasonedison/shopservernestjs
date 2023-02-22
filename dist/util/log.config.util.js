"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogUtil = void 0;
const winston_1 = require("winston");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
require("winston-daily-rotate-file");
class LogUtil {
    static getOutPutFormat(local) {
        return winston.format.combine(winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), local === true ? nest_winston_1.utilities.format.nestLike("NEST-JETSO_ZONE_ADMIN") : winston.format.json());
    }
    static getDailyRotateFile() {
        return {
            dirname: this.getDIR(),
            filename: this.getFileName(),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '100M',
            maxFiles: '3d',
            format: this.getOutPutFormat(false),
        };
    }
    static getDIR() {
        return 'logs';
    }
    static getFileName() {
        return 'shop-admin.log';
    }
}
exports.LogUtil = LogUtil;
_a = LogUtil;
LogUtil.createLogInstance = (0, winston_1.createLogger)({
    transports: [
        new winston.transports.File({
            filename: _a.getFileName(),
            dirname: _a.getDIR(),
            format: _a.getOutPutFormat(false),
        }),
        new winston.transports.DailyRotateFile(_a.getDailyRotateFile()),
        new winston.transports.Console({
            format: _a.getOutPutFormat(true),
        }),
    ],
});
//# sourceMappingURL=log.config.util.js.map