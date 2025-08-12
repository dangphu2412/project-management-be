import { Inject, Injectable } from '@nestjs/common';
import { DatabaseClient, DB_TOKEN } from '../../database/database.module';
import { statuses } from '../../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class StatusService {
  constructor(
    @Inject(DB_TOKEN)
    private readonly databaseClient: DatabaseClient,
  ) {}

  findByBusinessId(businessId: string) {
    return this.databaseClient
      .select()
      .from(statuses)
      .where(eq(statuses.businessId, businessId));
  }
}
