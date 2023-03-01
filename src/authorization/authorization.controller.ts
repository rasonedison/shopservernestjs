import { Controller, Post, Body, UseGuards, Get, Param, UseInterceptors, Req, Res, HttpStatus, HttpException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/jwt.auth.get-user.decorator';
import { IsLoginedInterceptor } from 'src/interceptor/check-login.interceptor';
import { LogService } from 'src/Log/custom.log';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthorizationService } from './authorization.service';
import { UserService } from 'src/user/user.service';
import { configUtil } from 'src/util/config.util';

@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly logService : LogService,
    private userService: UserService
    ) {}

  @Post('login')
  @UseInterceptors(IsLoginedInterceptor)
  async login(@Body() user: CreateUserDto, @Req() request){
    if(request.access_token){
      return {access_token : request.access_token }
    }
    const authenticatedUser: User = await this.authorizationService.validateUser(
      user.username,
      user.password,
    );
    return this.authorizationService.generateJWT(authenticatedUser);
  }

  @Get('azurelogin')
  @UseGuards(AuthGuard(configUtil.getAzureStrategy()))
  async azurelogin() {}

  @Post('azure')
  async callback(@Req() req, @Res({ passthrough: true }) response) {
    const aure_code:string = req.body.code; // get id_token from azure ad
    const access_token:string = await this.authorizationService.getAzureLoginToken("aure_code");
    const azure_user:any = await this.authorizationService.getAzureUserInfo(access_token);
    //console.log(azure_user);
    //see if the azure user already in DB, if no, insert a new USER in 
    let user = await this.userService.findOne( azure_user.mail );
    if(!user){
      user = await this.userService.create({username: azure_user.mail, password: "azure123",azureid: azure_user.id} as CreateUserDto);
    }
    // generate a application level jwt for cookie
    const jwt_token = await this.authorizationService.generateJWT(user);
    response.cookie('jwt_token', jwt_token.access_token);
    // const decoded = jwt_decode(jwt_token.access_token);
    // redirect to a success login page and set cookie for react sigle page read
    
    response.status(200)
        .json({ 
              statusCode: HttpStatus.FOUND,
              message: 'Azure Login Success',
              data: jwt_token.access_token
              });
    }


  @UseGuards(AuthGuard('jwt'))
  @Get('protected/:name')
  async protected(@GetUser() user: User, @Param('name') name: string) {
   // throw new InternalServerErrorException("test");
    this.logService.info('get protect api')
    return user;
  }

  @Post('index')
  async index(@Req() req) {
    console.log('index');
    //console.log(req);
    return {msg: "hello"};
  }

}
