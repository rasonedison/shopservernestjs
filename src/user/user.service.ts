import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, RolesDocument } from './entities/role.entity';
import { Menu, MenusDocument } from './entities/menu.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
    @InjectModel(Role.name) private roleModel: Model<RolesDocument>,
    @InjectModel(Menu.name) private menuModel: Model<MenusDocument>,
  ) {}

  async findOneWithPassword(_username: string, _password: string): Promise<User> {
    return this.userModel.findOne({ username: _username, password: _password, azureid:"application" }).populate({
      path: 'roles',
      populate: { path: 'menus' }
    }).exec();
  }

  async findOne(_username: string ): Promise<any> {
    const user =  await this.userModel.findOne({"username": _username}).populate({
      path: 'roles',
      populate: { path: 'menus' }
    }).exec()
    return user;
  }

  async find(): Promise<any> {
    const users =  await this.userModel.find().populate({
      path: 'roles',
      populate: { path: 'menus' }
    }).exec()
    console.log(users);
    return users;
  }
  
  async create( createUserDto:CreateUserDto ) {
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  async update( id:string, _role:Role ) {
   const updateUser = await this.userModel.findOneAndUpdate(
    { _id: id },
    { $addToSet: { roles: _role } },
    { new: true },
  );
    return updateUser;
  }

  async findRoleByName( _name: string ): Promise<Role> {
    const role = await this.roleModel.findOne({"name": _name});
    return role;
  }

  async findMenus(  ): Promise<Menu[]> {
    const menu:Menu[] = await this.menuModel.find();
    return menu;
  }

  async updateRoleWithMenus( id:string, _menus:Menu[] ) {
    const updateRole = await this.roleModel.findOneAndUpdate(
     { _id: id },
     { $addToSet: { menus: _menus } },
     { new: true },
   );
     console.log(updateRole);
     return updateRole;
   }

}
