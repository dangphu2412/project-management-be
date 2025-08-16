import { Controller, Get } from '@nestjs/common';
import { BacklogsService } from './backlogs.service';

@Controller('backlogs')
export class BacklogsController {
  constructor(private readonly backlogsService: BacklogsService) {}

  @Get()
  findAll() {
    return this.backlogsService.findAll();
  }
}
