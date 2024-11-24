import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities';
import { User } from 'src/users/entities';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '3lg3aZBHjY1OX6c',
  database: process.env.DATABASE_NAME || 'task-management-db',
  autoLoadEntities: true,
  synchronize: true,
  entities: [User, Task],
};
