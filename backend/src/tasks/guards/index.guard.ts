import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { TasksService } from '../tasks.service';

@Injectable()
export class TaskOwnerShipGuard implements CanActivate {
  constructor(private taskService: TasksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const taskId = request.params.id;

    const task = await this.taskService.validateTaskOwnership(taskId, user);
    return !!task;
  }
}
