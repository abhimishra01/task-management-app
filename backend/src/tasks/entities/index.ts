import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/users/entities';

import { TaskStatus } from '../interfaces';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  title: string;
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner' })
  user: User;
}
