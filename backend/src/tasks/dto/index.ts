import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsEnum } from 'class-validator';

import { TaskStatus } from '../interfaces';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `Status must be one of: ${Object.values(TaskStatus)}`,
  })
  status?: TaskStatus;
  @IsString()
  owner: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsEnum(TaskStatus, {
    message: `Status must be one of: ${Object.values(TaskStatus)}`,
  })
  @IsOptional()
  status?: TaskStatus;
}
