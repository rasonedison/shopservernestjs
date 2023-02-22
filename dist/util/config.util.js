"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configUtil = void 0;
const config = require("config");
class configUtil {
    static getDBConfigUrl(online) {
        let path = '';
        if (online) {
            path =
                'mongodb+srv://' +
                    config.get('DB.username') +
                    ':' +
                    config.get('DB.password') +
                    '@' +
                    config.get('DB.url') +
                    '/' +
                    config.get('DB.name') +
                    '?authSource=admin';
        }
        else {
            path = 'mongodb://root:root@127.0.0.1:27017/test?authSource=admin';
        }
        return path;
    }
    static getJWTSecrect() {
        return config.get("JWT_SECRECT");
    }
    static getMongoPrintLog() {
        return config.get('DB.log');
    }
    static getAzureADConfig(key) {
        return config.get('azure.' + key);
    }
}
exports.configUtil = configUtil;
//# sourceMappingURL=config.util.js.map