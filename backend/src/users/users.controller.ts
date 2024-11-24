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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { Role } from './interfaces';
import { User } from './entities';

@ApiTags('users')
@Controller('users')
@UseGuards(new JwtAuthenticationGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  @ApiOperation({ summary: 'Create a new User' })
  @ApiResponse({
    status: 200,
    description: 'Return the success response',
  })
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse({
    status: 200,
    description: 'Return the users',
  })
  @UseGuards(Authorization)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  @ApiOperation({ summary: 'Fetch a particular user' })
  @ApiResponse({
    status: 200,
    description: 'Return the user details',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post(':id')
  @Roles([Role.ADMIN])
  @ApiOperation({ summary: 'Update a user' })
  @UseGuards(Authorization)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @Roles([Role.ADMIN])
  @UseGuards(Authorization)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
