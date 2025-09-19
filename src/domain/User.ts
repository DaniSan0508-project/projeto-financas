import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { Account } from "./Account";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @OneToMany(() => Account, account => account.user)
    accounts: Account[];


    constructor(
        name: string,
        email: string,
    ) {
        this.name = name;
        this.email = email;
        this.accounts = []

        this.validate();
    }

    private validate(): void {
        if (!this.name) throw new Error("Nome de usuário é obrigatório")
        if (!this.email) throw new Error("E-mail é obrigatório")
    }

}