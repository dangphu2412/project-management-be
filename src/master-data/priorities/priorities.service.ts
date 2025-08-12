import { Inject, Injectable } from '@nestjs/common';
import { DatabaseClient, DB_TOKEN } from '../../database/database.module';
import { priorities } from '../../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PrioritiesService {
  constructor(
    @Inject(DB_TOKEN)
    private readonly databaseClient: DatabaseClient,
  ) {}

  findByBusinessId(businessId: string) {
    return this.databaseClient
      .select()
      .from(priorities)
      .where(eq(priorities.businessId, businessId));
  }
}
