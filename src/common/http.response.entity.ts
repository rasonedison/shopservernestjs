import { HttpStatus } from "@nestjs/common";

export class CustomHttpResponse {

    statusCode: number;
    successMsg: string;
    res: any;
    errMsg: string;
    errCode: string;

    constructor(_res: any, _successMsg = "success", _statusCode = HttpStatus.OK, _errMsg?: string, _errCode?:string){
       this.res = _res;
       this.statusCode = _statusCode;
       this.successMsg = _successMsg;
       this.errMsg = _errMsg;
       this.errCode = _errCode;
    }
}
