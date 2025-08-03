import { Module, RequestMethod } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    HealthCheckModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV', 'development');

        return {
          pinoHttp: {
            level: nodeEnv !== 'production' ? 'debug' : 'info',
            transport:
              nodeEnv !== 'production' ? { target: 'pino-pretty' } : undefined,
          },
          exclude: [{ method: RequestMethod.ALL, path: 'health-check' }],
        };
      },
    }),
  ],
})
export class AppModule {}
