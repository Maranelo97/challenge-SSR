import { Module } from '@nestjs/common';


import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AcountsModule } from './acounts/acounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV.trim()}.env`,
      isGlobal:true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule,
    AcountsModule,
    TransactionsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
