import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DB_CONFIG } from './config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupModule } from './lookup/lookup.module';
import { UserRoleModule } from './user_role/user_role.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: DB_CONFIG.DIALECT as 'postgres',
      host: DB_CONFIG.HOST,
      port: DB_CONFIG.PORT,
      username: DB_CONFIG.USERNAME,
      password: DB_CONFIG.PASSWORD,
      database: DB_CONFIG.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    LookupModule,
    UserRoleModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
