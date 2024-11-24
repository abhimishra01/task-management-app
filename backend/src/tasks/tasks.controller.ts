import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import {
  Authorization,
  JwtAuthenticationGuard,
} from 'src/authguard/auth.guard';
import { Roles } from 'src/authguard/roles.decorators';
import { Role } from 'src/users/interfaces';

import { TaskOwnerShipGuard } from './guards/index.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { CurrentUser } from './utils';

@UseGuards(new JwtAuthenticationGuard())
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(Authorization)
  @Get()
  findAll(@CurrentUser() currentUser: any) {
    return this.tasksService.findAll(currentUser);
  }

  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(Authorization)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(Authorization)
  @UseGuards(TaskOwnerShipGuard)
  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.tasksService.update(id, updateTaskDto, currentUser);
  }

  @Roles([Role.ADMIN, Role.USER])
  @UseGuards(Authorization)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
