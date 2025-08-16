import { Inject, Injectable } from '@nestjs/common';
import { DatabaseClient, DB_TOKEN } from '../database/database.module';
import { userStories } from '../database/schema';
import { isNull } from 'drizzle-orm';

@Injectable()
export class BacklogsService {
  constructor(
    @Inject(DB_TOKEN)
    private readonly databaseClient: DatabaseClient,
  ) {}

  findAll() {
    return this.databaseClient
      .select()
      .from(userStories)
      .where(isNull(userStories.sprintId));
  }
}
