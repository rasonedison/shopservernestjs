// import { Inject, Injectable, Logger, Scope} from "@nestjs/common";
// import { REQUEST } from '@nestjs/core';
// import { Request } from 'express';


import { Injectable, Scope, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class LogService {
  constructor(
    @Inject(REQUEST) private readonly request: Request, // nest-core 9.3.3 fixed
    @Inject(Logger) private readonly logger: Logger
    ) {}
  
    info(msg: string){
        const user: User = this.request.user as User;
        const username = user? user.username : "anonymous";
        this.logger.log(`${username}: ${msg}`)
    }
}