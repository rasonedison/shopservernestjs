import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogService } from 'src/Log/custom.log';
import { Role, RolesSchema } from './entities/role.entity';
import { User } from './entities/user.entity';
import { use } from 'passport';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private logService : LogService
    ) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findOne() {
    const user:User = await this.userService.findOne("rasonsze@gmail.com");
    // throw new InternalServerErrorException("not login")
    //this.logService.info();
   // this.logger.log('123');
   return user;
  }

  @Get('/all')
  async find() {
    const user:User = await this.userService.find();
    // throw new InternalServerErrorException("not login")
    //this.logService.info();
   // this.logger.log('123');
   return user;
  }


  @Get('/init')
  async initData() {

    const role:Role = await this.userService.findRoleByName("product");
    //console.log(role.name);
    const user:User = await this.userService.findOne("rasonsze@gmail.com");//@gmail.com
    console.log(user.id)
    const res = await this.userService.update(user.id, role);
    console.log(res);
    return 'res';
    // throw new InternalServerErrorException("not login")
    //this.logService.info();
   // this.logger.log('123');
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
