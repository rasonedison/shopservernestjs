import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { configUtil } from 'src/util/config.util';

@Injectable()
export class AuthorizationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneWithPassword(username, password);
    if (!user) {
      console.log("username, password is wrong")
      throw new UnauthorizedException();
    }
    // const isPasswordValid = true; // 应该改为先查用户存在，在对比密码
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException();
    // }
    return user;
  }

  async generateJWT(user: any) {
    const payload = { ...user, sub: 123 }; // 这里需要添加role & permisson
    //console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAzureLoginToken (_code: string) {
    const data = {
      client_id: configUtil.getAzureADConfig('clientID') , 
      redirect_uri: configUtil.getAzureADConfig('redirectUrl'),
      grant_type: 'authorization_code',
      client_secret: configUtil.getAzureADConfig('clientSecret'),
      code: _code
    }
    //console.log(data);
    try {
      const res = await lastValueFrom(
        this.httpService
          .post('https://login.microsoftonline.com/b901cb1b-9873-47c3-a927-2f4628111397/oauth2/v2.0/token',
          data,
          {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}).pipe(map((res) => res.data)));
          return res.access_token;
    } catch (error) {
      throw new UnauthorizedException("Unauthorized : Get Azure Access Token Error",`code: ${_code}`);
    }
    //return res.access_token;
  }

  async getAzureUserInfo (_access_token: string){
    try {
      const res = await lastValueFrom(
        this.httpService
          .get('https://graph.microsoft.com/v1.0/me',
          {headers:{'Authorization': `Bearer ${_access_token}`}}).pipe(map((res) => res.data)));
      return res;
    } catch (error) {
      throw new UnauthorizedException("Unauthorized : Get Azure User Error",`Access Token: ${_access_token}`);
    }
  }
}
