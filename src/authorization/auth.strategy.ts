import {
  Injectable,
} from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { configUtil } from 'src/util/config.util';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    console.log('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configUtil.getJWTSecrect(),
    });
  }

  async validate(payload: any, header: Headers) {
    console.log(payload._doc.username);
    return this.userService.findOne(payload._doc.username);
  }
}
