import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersAcountEntity } from './entities/usersAcount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UsersAcountEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {  }
