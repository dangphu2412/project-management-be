import { Controller, Get, Query } from '@nestjs/common';
import { PrioritiesService } from './priorities.service';

@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Get()
  findByBusinessId(@Query('businessId') businessId: string) {
    return this.prioritiesService.findByBusinessId(businessId);
  }
}
