import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TaskStatus } from '../interfaces';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task to be created',
    example: 'Migrate to NestJS',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The current status of the task',
    example: 'done',
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `Status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  status?: TaskStatus;

  @ApiProperty({
    description: 'The owner/assignee of the task',
    example: 'John Doe',
  })
  @IsString()
  owner: string;
}
export class UpdateTaskDto {
  @ApiProperty({
    description: 'The updated title of the task',
    example: 'Migrate from Express to NestJS',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The updated status of the task',
    example: 'in_progress',
    enum: TaskStatus,
    required: false,
  })
  @IsEnum(TaskStatus, {
    message: `Status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  @IsOptional()
  status?: TaskStatus;
}
