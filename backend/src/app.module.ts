import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { AuthguardModule } from './authguard/authguard.module';
import { UsersModule } from './users/users.module';
import { BaseModule } from './base/base.module';
import { dbConfig } from './database/db';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    UsersModule,
    BaseModule,
    TypeOrmModule.forRoot(dbConfig),
    TasksModule,
    AuthModule,
    AuthguardModule,
  ],
  providers: [SeederService, Reflector],
})
export class AppModule {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seedUsers();
  }
}
