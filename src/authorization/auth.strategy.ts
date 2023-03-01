import {
  Injectable,
} from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { configUtil } from 'src/util/config.util';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configUtil.getJWTSecrect(),
    });
  }

  async validate(payload: any, header: Headers): Promise<User> {
    //console.log(payload._doc.username);
    return this.userService.findOne(payload._doc.username);
  }
}
