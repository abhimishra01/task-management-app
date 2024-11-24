export interface GetTasksInterface {
  id: number;
  title: string;
  status: boolean;
  assignee: string;
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
