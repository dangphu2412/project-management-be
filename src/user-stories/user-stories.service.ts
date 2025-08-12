import { Inject, Injectable } from '@nestjs/common';
import { DatabaseClient, DB_TOKEN } from '../database/database.module';
import {
  CreateUserStoryDto,
  UpdateUserStoryDto,
} from './user-stories.controller';
import { userStories } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserStoriesService {
  constructor(
    @Inject(DB_TOKEN)
    private readonly databaseClient: DatabaseClient,
  ) {}

  create(createUserStoryDto: CreateUserStoryDto) {
    return this.databaseClient.insert(userStories).values({
      ...createUserStoryDto,
    });
  }

  findAll() {
    return this.databaseClient.select().from(userStories);
  }

  findOne(id: string) {
    return this.databaseClient
      .select()
      .from(userStories)
      .where(eq(userStories.id, id));
  }

  update(id: string, updateUserStoryDto: UpdateUserStoryDto) {
    return this.databaseClient
      .update(userStories)
      .set(updateUserStoryDto)
      .where(eq(userStories.id, id));
  }

  remove(id: string) {
    return this.databaseClient
      .delete(userStories)
      .where(eq(userStories.id, id));
  }
}
