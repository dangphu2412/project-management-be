import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseClient, DB_TOKEN } from '../../database/database.module';
import { users } from '../../database/schema';
import { LoginDTO } from './auth.controller';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_TOKEN)
    private readonly databaseClient: DatabaseClient,
  ) {}

  async login(loginDTO: LoginDTO) {
    const [user] = await this.databaseClient
      .select()
      .from(users)
      .where(eq(users.name, loginDTO.username))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return {
      accessToken: 'abc',
    };
  }
}
