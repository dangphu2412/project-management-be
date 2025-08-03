import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseClient, DB_TOKEN } from '../../database/database.module';
import { users } from '../../database/schema';
import { LoginDTO, LoginResponse, RegisterDTO } from './auth.controller';
import { eq } from 'drizzle-orm';
import { sign } from 'jsonwebtoken';

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
      .where(eq(users.email, loginDTO.username))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const accessToken = sign({ id: user.id }, 'secret', { expiresIn: '15m' });

    return {
      accessToken,
    } as LoginResponse;
  }

  register(registerDTO: RegisterDTO) {
    return this.databaseClient
      .insert(users)
      .values({
        ...registerDTO,
        email: registerDTO.username,
        role: 'member',
      })
      .execute();
  }
}
