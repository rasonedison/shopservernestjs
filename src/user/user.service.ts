import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, RolesDocument } from './entities/role.entity';
import { use } from 'passport';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UserModule } from './user.module';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
    @InjectModel(Role.name) private roleModel: Model<RolesDocument>,
  ) {}

  async findOneWithPassword(_username: string, _password: string): Promise<User> {
    return this.userModel.findOne({ username: _username, password: _password, azureid:"application" }).exec();
  }

  async findOne(_username: string ): Promise<any> {

    const user =  await this.userModel.findOne({"username": _username}).exec()

    console.log(user);
    return user;
  }

  async find(): Promise<any> {

    const users =  await this.userModel.find().populate('roles').exec()

    console.log(users);
    return users;
  }


  async create( createUserDto:CreateUserDto ) {
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  async update( id:string, _role:Role ) {
   // const updateUser = await this.userModel.updateOne({'username': _username}, {'roles': [{_role}]})
   const updateUser = await this.userModel.findOneAndUpdate(
    { _id: id },
    { $addToSet: { roles: _role } },
    { new: true },
  );
    console.log(updateUser);
    return updateUser;
  }

  async findRoleByName( _name: string ): Promise<Role> {
    const role = await this.roleModel.findOne({"name": _name});
    return role;
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
