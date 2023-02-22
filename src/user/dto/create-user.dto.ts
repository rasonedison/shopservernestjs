import { Optional } from '@nestjs/common';
import { IsString, IsInt, IsNotEmpty, Length, min, max, isString } from 'class-validator';

export class CreateUserDto {

    @Length(4,15)
    @IsString()
    username: string

    @IsString()
    @Length(6,12)
    password: string

    @Optional()
    age: string
    
    @Optional()
    azureid: string
}
