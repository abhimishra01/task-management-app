import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { Role } from './interfaces';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const finalUserOutput = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // check whether user already exists with the same name
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (!existingUser) {
      const userData = await this.userRepository.save(finalUserOutput);

      if (userData.username === createUserDto.username)
        return {
          message: `User ${createUserDto.username} created successfully`,
        };
    }

    throw new HttpException(
      { message: 'User with the same name already exists!' },
      HttpStatus.BAD_REQUEST,
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  findByRole(role: Role): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        { message: 'User not found!' },
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  async findOneByName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user)
      throw new HttpException(
        { message: 'User not found!' },
        HttpStatus.NOT_FOUND,
      );

    return user;
  }
  async findOneByNameSeeder(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    const dbResponse = await this.userRepository.update(id, updateUserDto);
    if (dbResponse.affected === 0)
      return { message: `User with id ${id} doesn't exist` };

    return { message: `User with id ${id} updated successfully` };
  }

  async remove(id: string) {
    try {
      const dbResponse = await this.userRepository.delete(id);
      if (dbResponse.affected === 0)
        return { message: `User with id ${id} doesn't exist` };

      this.logger.log('User deleted successfully');
      return { message: 'User deleted successfully' };
    } catch (error) {
      return { message: 'User deleted successfully' };
    }
  }

  async validateUser(username: string, inputPassword: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
