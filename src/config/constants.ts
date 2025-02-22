import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({ isGlobal: true });

const configService = new ConfigService();

export const DB_CONFIG = {
  HOST: configService.get<string>('DB_HOST', 'localhost'),
  PORT: configService.get<number>('DB_PORT', 5432),
  USERNAME: configService.get<string>('DB_USER', 'postgres'),
  PASSWORD: configService.get<string>('DB_PASSWORD', '123456'),
  DATABASE: configService.get<string>('DB_NAME', 'my_db'),
  DIALECT: configService.get<string>('DATABASE_DIALECT', 'postgres'),
};

export const JWT_CONFIG = {
  SECRET: configService.get<string>('JWT_SECRET', 'mySuperSecretKey'),
  EXPIRES_IN: configService.get<string>('JWT_EXPIRES_IN', '1h'),
};

export const APP_CONFIG = {
  ENV: configService.get<string>('NODE_ENV', 'development'),
  PORT: configService.get<number>('APP_PORT', 3000),
};
