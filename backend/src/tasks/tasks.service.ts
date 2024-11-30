import { CurrentUser, transformAllTasksWithUser } from './utils/index';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities';
import { Role } from 'src/users/interfaces';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from './entities';
import { GetTasksInterface } from './interfaces';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async validateTaskOwnership(
    taskId: number,
    currentUser: User,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['user'],
    });

    if (!task) throw new NotFoundException(`Task with ID ${taskId} not found`);
    if (currentUser.role === Role.ADMIN) return task;
    if (task.user.id !== currentUser.id)
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );

    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<{ message: string }> {
    const { owner: ownerId } = createTaskDto;
    const user = await this.userService.findOneByName(ownerId);
    if (!user) throw new NotFoundException(`User with ID ${ownerId} not found`);

    const task = this.taskRepository.create({ ...createTaskDto, user });
    await this.taskRepository.save(task);
    return {
      message: 'Task created successfully',
    };
  }

  async findAll(currentUser: User): Promise<GetTasksInterface[]> {
    let dbResponse;

    if (currentUser.role === Role.ADMIN) {
      dbResponse = await this.taskRepository.findAndCount({
        relations: ['user'],
      });
      const finalResponse = transformAllTasksWithUser(dbResponse);
      return finalResponse;
    }

    dbResponse = await this.taskRepository.find({
      where: { user: { id: currentUser.id } },
      relations: ['user'],
    });

    const finalResponse = transformAllTasksWithUser(dbResponse);

    if (!finalResponse) throw new NotFoundException(`Tasks not found`);

    return finalResponse;
  }

  async findOne(id: number): Promise<Task | { message: string }> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (isEmpty(task)) {
      throw new HttpException(
        { message: 'Task not found!' },
        HttpStatus.NOT_FOUND,
      );
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, currentUser: any) {
    try {
      await this.taskRepository.update(id, updateTaskDto);
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        { message: 'Task update failed!' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'Task updated successfully' };
  }

  async remove(id: string | number) {
    try {
      const dbResponse = await this.taskRepository.delete(id);
      console.log({ dbResponse });
      if (dbResponse.affected === 0)
        throw new HttpException(
          { message: 'Task not found!' },
          HttpStatus.NOT_FOUND,
        );

      return { message: 'Task deleted successfully' };
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        { message: 'Task deletion failed!' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
