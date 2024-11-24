import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import {
  Authorization,
  JwtAuthenticationGuard,
} from 'src/authguard/auth.guard';
import { Roles } from 'src/authguard/roles.decorators';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { Role } from './interfaces';
import { User } from './entities';

@Controller('users')
@UseGuards(new JwtAuthenticationGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
