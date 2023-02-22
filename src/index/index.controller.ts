import { Controller, Get } from '@nestjs/common';
import { IndexService } from './index.service';
import * as config from 'config';

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  getHello(): string {
    console.log(config.get('App'));

    console.log(config.get('DB.name'));

    console.log(config.get('DB.username'));

    return this.indexService.getHello();
  }
}
