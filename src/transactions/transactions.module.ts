import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { TransactionsService } from './services/transaction.service';
import { TransactionsController } from './controllers/transactions.controller';
import { AcountsEntity } from 'src/acounts/entities/acounts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionsEntity, AcountsEntity])
    ],
    providers: [TransactionsService],
    controllers: [TransactionsController]
})
export class TransactionsModule { }
