import { Logger } from '@nestjs/common';
import { Request } from 'express';
export declare class LogService {
    private readonly request;
    private readonly logger;
    constructor(request: Request, logger: Logger);
    info(msg: string): void;
}
