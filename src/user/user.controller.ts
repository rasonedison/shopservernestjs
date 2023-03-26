import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogService } from 'src/Log/custom.log';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Menu } from './entities/menu.entity';
import { AuthGuard } from '@nestjs/passport';
import { CustomHttpResponse } from 'src/common/http.response.entity';
import { GetUser } from 'src/decorators/jwt.auth.get-user.decorator';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private logService : LogService
    ) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): CustomHttpResponse {
    return new CustomHttpResponse(this.userService.create(createUserDto));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async find() {
    const user:User = await this.userService.find();
   return new CustomHttpResponse(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/currentUser')
  async getCurrentUser(@GetUser() _user: User) {
    const user:User = await this.userService.findOne(_user.username);
   return new CustomHttpResponse(user);
  }


  //@UseGuards(AuthGuard('jwt'))
  @Get('/init')
  async initData() {
    const menus: Menu[] = await this.userService.findMenus();
    const role:Role = await this.userService.findRoleByName("admin");
    const res = await this.userService.updateRoleWithMenus(role.id, menus);
    //console.log(role.name);
    // const user:User = await this.userService.findOne("rasonsze@gmail.com");//@gmail.com
    // console.log(user.id)
    // const res = await this.userService.update(user.id, role);
    // console.log(res);
    return role;
    // throw new InternalServerErrorException("not login")
    //this.logService.info();
   // this.logger.log('123');
  }
}
