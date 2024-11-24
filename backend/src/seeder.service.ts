import { Injectable, Logger } from '@nestjs/common';
import { Role } from './users/interfaces';
import { UsersService } from './users/users.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  constructor(private readonly userService: UsersService) {}

  async seedUsers() {
    const admins = await this.userService.findByRole(Role.ADMIN);

    if (admins.length === 0) {
      const adminUsers = [
        {
          username: 'admin1',
          password: 'password1',
          role: Role.ADMIN,
        },
        {
          username: 'user1',
          password: 'password2',
          role: Role.USER,
        },
      ];

      adminUsers.forEach(async (admin) => {
        const userExists = await this.userService.findOneByNameSeeder(
          admin.username,
        );
        if (!userExists) await this.userService.create(admin);
        else Logger.log(`User ${admin.username} already exists`);
      });
    }
  }
}
