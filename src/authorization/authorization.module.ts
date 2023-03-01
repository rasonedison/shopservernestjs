import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthStrategy } from './auth.strategy';
import { AzureADGuard, AzureADStrategy } from './auth.ad.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IsLoginedInterceptor } from 'src/interceptor/check-login.interceptor';
import { configUtil } from 'src/util/config.util';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: configUtil.getAzureStrategy(),
    }),
    JwtModule.register({
      secret: configUtil.getJWTSecrect(),
      signOptions: { expiresIn: configUtil.getJWTTimoutConfig() },
    }),
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, 
    UserService, 
    AuthStrategy, 
    JwtAuthGuard, 
    AzureADStrategy, AzureADGuard,
    {
    provide: APP_INTERCEPTOR,
    useClass: IsLoginedInterceptor, //这样才可以在拦截器修改req传递到controller
  },],
  exports: [AuthorizationService, JwtAuthGuard, AzureADStrategy],
})
export class AuthorizationModule {
  //注册中间件
  // configure(consumer) {
  //   consumer
  //     .apply(AzureADState)
  //     .forRoutes('/auth/azurelogin');
  // }
}
