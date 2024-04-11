import { Column, Entity, OneToMany } from "typeorm";
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { TransactionsEntity } from "../../transactions/entities/transactions.entity";
import { UsersAcountEntity } from "./usersAcount.entity";
import { Exclude } from 'class-transformer'

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    age: number;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    password: string;
    @Column({ type: 'enum', enum: ROLES })
    role: ROLES;

    @OneToMany(() => UsersAcountEntity, (usersAcounts) => usersAcounts.user)
    acountIncludes: UsersAcountEntity[]

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.sender)
    transactionsSent: TransactionsEntity[];

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.receiver)
    transactionsReceived: TransactionsEntity[];

}