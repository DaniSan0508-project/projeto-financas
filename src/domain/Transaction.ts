// src/domain/Transaction.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Account } from "./Account";
import { Category } from "./Category";


export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Entity({ name: "transactions" })
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @CreateDateColumn()
    date!: Date;

    @ManyToOne('Account', (account: Account) => account.transactions)
    account: Account;

    @ManyToOne('Category', (category: Category) => category.transactions)
    category: Category;

    constructor(description: string, amount: number, type: TransactionType, account: Account, category: Category) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.account = account;
        this.category = category;
        this.validate();
    }

    private validate(): void {
        if (!this.description) throw new Error("Descrição é obrigatória.");
        if (this.amount <= 0) throw new Error("O valor da transação deve ser positivo.");
        if (!this.account) throw new Error("A transação precisa pertencer a uma conta.");
        if (!this.category) throw new Error("A transação precisa ter uma categoria.");
    }
}