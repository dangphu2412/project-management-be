import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import { PrioritiesModule } from './priorities/priorities.module';

@Module({
  imports: [StatusModule, PrioritiesModule],
})
export class MasterDataModule {}