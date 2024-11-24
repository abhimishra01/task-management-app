import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  sayHello(): { message: string } {
    return { message: `Welcome!` };
  }
}
