import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../interfaces';
export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'keanu',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The role assigned to the user',
    example: 'admin',
    required: false,
    enum: Role,
  })
  @IsString()
  @IsOptional()
  role: Role;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'pitbull1231',
  })
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The updated username for the user',
    example: 'wick991',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The updated role for the user',
    example: 'user',
    required: false,
    enum: Role,
  })
  @IsString()
  @IsOptional()
  role?: Role;

  @ApiProperty({
    description: 'The updated password for the user',
    example: 'continental123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;
}
