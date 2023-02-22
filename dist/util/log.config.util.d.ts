import * as winston from 'winston';
import 'winston-daily-rotate-file';
export declare class LogUtil {
    static createLogInstance: winston.Logger;
    static getOutPutFormat(local: boolean): winston.Logform.Format;
    static getDailyRotateFile(): {
        dirname: string;
        filename: string;
        datePattern: string;
        zippedArchive: boolean;
        maxSize: string;
        maxFiles: string;
        format: winston.Logform.Format;
    };
    static getDIR(): string;
    static getFileName(): string;
}
