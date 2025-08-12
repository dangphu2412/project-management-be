import { Controller, Get, Query } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findByBusinessId(@Query('businessId') businessId: string) {
    return this.statusService.findByBusinessId(businessId);
  }
}
