import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Task } from 'src/tasks/entities';

import { Role } from '../interfaces';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
