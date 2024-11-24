import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';

import { CreateAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    createAuthDto: CreateAuthDto,
  ): Promise<{ access_token: string; role: string }> {
    const { username, password } = createAuthDto;
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      role: user.role,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(name: string, inputPassword: string): Promise<User> {
    const user = await this.usersService.findOneByName(name);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
