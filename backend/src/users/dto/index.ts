import { IsString, IsInt, IsOptional, IsEmail, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { Role } from '../interfaces';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  @IsOptional()
  role: Role;
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  role?: Role;
  @IsString()
  @IsOptional()
  password?: string;
}
