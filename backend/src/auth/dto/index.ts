import { PartialType } from '@nestjs/mapped-types';

export class CreateAuthDto {
  username: string;
  password: string;
}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
