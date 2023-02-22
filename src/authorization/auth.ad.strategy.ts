import { Injectable } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy, OIDCStrategy, } from 'passport-azure-ad';
import { UserService } from '../user/user.service';
import { configUtil } from 'src/util/config.util';

@Injectable()
export class AzureADStrategy extends PassportStrategy(OIDCStrategy, 'azuread') {
  constructor() {
    super({
    identityMetadata: configUtil.getAzureADConfig('identityMetadata'),
    clientID: configUtil.getAzureADConfig('clientID'),
    redirectUrl: configUtil.getAzureADConfig('redirectUrl'),
    responseType: configUtil.getAzureADConfig('responseType'),
    responseMode: configUtil.getAzureADConfig('responseMode'),
    allowHttpForRedirectUrl: configUtil.getAzureADConfig('allowHttpForRedirectUrl'),
    passReqToCallback: configUtil.getAzureADConfig('passReqToCallback'),
    clientSecret: configUtil.getAzureADConfig('clientSecret'),
    });
  }
}

export const AzureADGuard = AuthGuard('azure-ad');
