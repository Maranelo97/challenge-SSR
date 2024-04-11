import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IAcount } from "../../interfaces/acount.interface";
import { UsersAcountEntity } from "../../users/entities/usersAcount.entity";
import { TransactionsEntity } from "../../transactions/entities/transactions.entity";

@Entity({ name: 'projects' })
export class AcountsEntity extends BaseEntity implements IAcount {
    @Column()
    currency: string;
    @Column()
    capital: number

    @OneToMany(() => UsersAcountEntity, (usersProjects) => usersProjects.project)
    usersIncludes: UsersAcountEntity[]

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.senderAccount)
    transactionsSent: TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.receiverAccount)
    transactionsReceived: TransactionsEntity[];
}