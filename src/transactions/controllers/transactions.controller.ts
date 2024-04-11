import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionsService } from "../services/transaction.service";
import { TransactionsEntity } from "../entities/transactions.entity";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) { }

    @Post('transfer')
    public async createTransaction(@Body() body: any): Promise<TransactionsEntity> {
        const { senderAccountId, receiverAccountId, amount, description } = body;

        if (!senderAccountId || !receiverAccountId || !amount || !description) {
            throw new Error('Missing parameters');
        }

        return await this.transactionService.createTransaction(senderAccountId, receiverAccountId, amount, description);
    }

    @Get('/:senderId')
    async getTransactionsByUserId(@Param('senderId') senderId: string): Promise<TransactionsEntity[]> {
        return this.transactionService.getTransactionsByUserId(senderId);
    }
}