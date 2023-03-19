import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Menu } from './menu.entity';
import { User } from './user.entity';


export type RolesDocument = Role & Document;
// const FIXED_SALT = bcrypt.genSaltSync(10);
// console.log("FIXED_SALT:"+FIXED_SALT) 
@Schema()
export class Role extends Document {
  @Prop({ required: true, unique:true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }])
  menus: Menu;

}
export const RolesSchema = SchemaFactory.createForClass(Role);
