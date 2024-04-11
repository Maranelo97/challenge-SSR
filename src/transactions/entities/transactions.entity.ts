import { BaseEntity } from "../../config/base.entity";
import { Column, ManyToOne, Entity } from "typeorm";
import { AcountsEntity } from "../../acounts/entities/acounts.entity";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity({ name: 'transactions' })
export class TransactionsEntity extends BaseEntity {
    @ManyToOne(() => UsersEntity, (user) => user.transactionsSent)
    sender: UsersEntity;

    @ManyToOne(() => UsersEntity, (user) => user.transactionsReceived)
    receiver: UsersEntity;

    @ManyToOne(() => AcountsEntity, (account) => account.transactionsSent)
    senderAccount: AcountsEntity;

    @ManyToOne(() => AcountsEntity, (account) => account.transactionsReceived)
    receiverAccount: AcountsEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    description: string;
}