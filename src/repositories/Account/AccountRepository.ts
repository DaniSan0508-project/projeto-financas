import { AppDataSource } from "../../data-source";
import { Account } from "../../domain/Account";
import { User } from "../../domain/User";
import { IAccountRepository } from "./IAccountRepository";

export class AccountRepository implements IAccountRepository {
    private ormRepository = AppDataSource.getRepository(Account);



    public async findById(id: string): Promise<Account | null> {
        const account = await this.ormRepository.findOneBy({ id });
        return account || null;

    }

    public async findByUserId(userId: string): Promise<Account[]> {
        const accounts = await this.ormRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        return accounts;
    }

    public async save(account: Account): Promise<Account> {
        const savedAccount = await this.ormRepository.save(account);
        return savedAccount;
    }

}