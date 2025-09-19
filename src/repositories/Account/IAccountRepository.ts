import { Account } from "../../domain/Account";

export interface IAccountRepository {
    findById(id: string): Promise<Account | null>;
    findByUserId(userId: string): Promise<Account[]>;
    save(account: Account): Promise<Account>;
}