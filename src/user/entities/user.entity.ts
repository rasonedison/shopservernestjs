import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto'; // for md5
import { Role } from './role.entity';


export type UsersDocument = User & Document;
// const FIXED_SALT = bcrypt.genSaltSync(10);
// console.log("FIXED_SALT:"+FIXED_SALT) 
@Schema()
export class User extends Document {
  @Prop({ required: true, unique:true })
  username: string;

  @Prop({ 
    required: true, 
    select: false, 
    set: value => crypto.createHash('md5').update(value).digest('hex')
    // (value) => { 
    //   return bcrypt.hashSync(value, FIXED_SALT) // 需要把salt存入databases，因为即使固定salt,也是重启服务器也会变化
    // } 
  ,})
  password: string;

  @Prop({ required: true, default:"application" })
  azureid: string

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }])
  roles: Role[];
}
export const UsersSchema = SchemaFactory.createForClass(User);
