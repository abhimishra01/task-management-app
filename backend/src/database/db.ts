import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities';
import { User } from 'src/users/entities';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
  entities: [User, Task],
};
