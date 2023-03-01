import { ExecutionContext, Global, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IndexController } from './index/index.controller';
import { IndexService } from './index/index.service';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { OrderModule } from './order/order.module';
import { AssetsModule } from './assets/assets.module';
import { configUtil } from './util/config.util';
import { LogService } from './Log/custom.log';

//console.log(configUtil.getAzureADConfig())

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(configUtil.getDBConfigUrl(false), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    AuthorizationModule,
    OrderModule,
    AssetsModule,
  ],
  controllers: [IndexController],
  providers: [IndexService, Logger, LogService],
  exports: [Logger, LogService]
})
export class AppModule {}

mongoose.set('debug', configUtil.getMongoPrintLog());

