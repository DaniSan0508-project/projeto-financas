// src/domain/Category.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name: string;

    @OneToMany('Transaction', (transaction: Transaction) => transaction.category)
    transactions: Transaction[];

    constructor(name: string) {
        this.name = name;
        this.transactions = [];
        this.validate();
    }

    private validate(): void {
        if (!this.name) throw new Error("Nome da categoria é obrigatório.");
    }
}