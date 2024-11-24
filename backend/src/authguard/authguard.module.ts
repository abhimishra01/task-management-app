import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  providers: [JwtStrategy, LocalStrategy],
  exports: [JwtStrategy, LocalStrategy],
})
export class AuthguardModule {}
