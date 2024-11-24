import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthguardModule } from 'src/authguard/authguard.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthguardModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
