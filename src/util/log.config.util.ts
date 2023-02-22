import { createLogger } from 'winston';
import { utilities } from 'nest-winston';
import * as winston from 'winston'; 
import 'winston-daily-rotate-file';


export class LogUtil {

    static createLogInstance: winston.Logger= createLogger({
        transports: [
          new winston.transports.File({ 
            filename: this.getFileName(),
            dirname: this.getDIR(),
            format: this.getOutPutFormat(false),
          }),
          new winston.transports.DailyRotateFile(this.getDailyRotateFile()),
          new winston.transports.Console({
            format: this.getOutPutFormat(true),
          }),
        ],
      });

    static getOutPutFormat(local: boolean): winston.Logform.Format {
        return winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                local === true ? utilities.format.nestLike("NEST-JETSO_ZONE_ADMIN") : winston.format.json(),
            )
    }

    static getDailyRotateFile(){
        return {
            dirname: this.getDIR(), // 日志保存的目录
            filename: this.getFileName(), // 日志名称，占位符 %DATE% 取值为 datePattern 值。
            datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
            zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
            maxSize: '100M', // 设置日志文件的最大大小，m 表示 mb 。
            maxFiles: '3d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
            // 记录时添加时间戳信息
            format: this.getOutPutFormat(false),
          }
    }

    static getDIR(): string{
        return 'logs';
    }

    static getFileName(): string{
        return 'shop-admin.log';
    }
}