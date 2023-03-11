import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersDocument, UsersSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role, RolesSchema } from './entities/role.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UsersSchema },
      { name: Role.name, schema: RolesSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
