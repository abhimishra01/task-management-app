import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'The username for authentication',
    example: 'johnwick',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'pitbull1231',
  })
  @IsString()
  password: string;
}
