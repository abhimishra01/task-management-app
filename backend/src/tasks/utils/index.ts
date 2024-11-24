import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetTasksInterface } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const transformAllTasksWithUser = (dbResponse): GetTasksInterface[] =>
  dbResponse.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    assignee: task.user ? task.user.username : 'Unassigned',
  }));
