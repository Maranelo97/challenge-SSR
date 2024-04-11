import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionsEntity } from "../entities/transactions.entity";
import { AcountsEntity } from "src/acounts/entities/acounts.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionsRepository: Repository<TransactionsEntity>,
        @InjectRepository(AcountsEntity)
        private readonly accountsRepository: Repository<AcountsEntity>,
    ) { }

    async createTransaction(senderAccountId: string, receiverAccountId: string, amount: number, description: string): Promise<TransactionsEntity> {
        const senderAccount = await this.accountsRepository.findOneOrFail({ where: { id: senderAccountId } });
        const receiverAccount = await this.accountsRepository.findOneOrFail({ where: { id: receiverAccountId } });

        if (senderAccount.capital < amount) {
            throw new Error('Insufficient funds');
        }

        const transaction = new TransactionsEntity();
        transaction.senderAccount = senderAccount;
        transaction.receiverAccount = receiverAccount;
        transaction.amount = amount;
        transaction.description = description;


        senderAccount.capital -= amount;


        receiverAccount.capital += amount;


        await this.accountsRepository.save([senderAccount, receiverAccount]);


        return this.transactionsRepository.save(transaction);
    }
}