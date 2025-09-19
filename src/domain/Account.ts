import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    name: string;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    balance: number = 0;
    @Column()
    user: User;
    @OneToMany('Transaction', (transaction: Transaction) => transaction.account)
    transactions: Transaction[];

    constructor(
        name: string,
        initialBalance: number = 0,
        user: User,
        transactions: Transaction[]
    ) {
        this.name = name;
        this.balance = initialBalance;
        this.user = user;
        this.transactions = [];
        this.validate();
    }

    private validate(): void {
        if (!this.name) throw new Error("Nome da conta é obrigatório")
        if (this.balance < 0) throw new Error("Saldo da conta é obrigatório")
        if (!this.user) throw new Error("Usuário da conta é obrigatório")
    }

}