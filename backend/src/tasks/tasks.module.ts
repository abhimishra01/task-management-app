import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthguardModule } from 'src/authguard/authguard.module';
import { UsersModule } from 'src/users/users.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    forwardRef(() => AuthguardModule),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
