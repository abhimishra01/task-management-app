import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorators';

@Injectable()
export class Authorization implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true; // proceed without checking roles
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.role)
      throw new UnauthorizedException('User not authorized');

    return roles.includes(user.role);
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }
    return user;
  }
}
