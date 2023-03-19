import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MenusDocument = Menu & Document;
// const FIXED_SALT = bcrypt.genSaltSync(10);
// console.log("FIXED_SALT:"+FIXED_SALT) 
@Schema()
export class Menu extends Document {
  @Prop({ required: true, unique:true })
  name: string;

}
export const MenusSchema = SchemaFactory.createForClass(Menu);
