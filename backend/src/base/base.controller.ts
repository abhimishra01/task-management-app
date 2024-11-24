import { Controller, Get } from '@nestjs/common';

import { BaseService } from './base.service';

@Controller('')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}
  @Get()
  sayHello(): { message: string } {
    return this.baseService.sayHello();
  }
}
