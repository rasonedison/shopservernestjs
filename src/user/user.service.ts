import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UserModule } from './user.module';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async findOneWithPassword(_username: string, _password: string): Promise<User> {
    return this.userModel.findOne({ username: _username, password: _password, azureid:"application" }).exec();
  }

  async findOne(_username: string ): Promise<User> {
    return this.userModel.findOne({ username: _username }).exec();
  }


  async create( createUserDto:CreateUserDto ) {
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  // async findAll() {
  //   return await this.userModel.find().exec();
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
