import { AppDataSource } from "../../data-source";
import { User } from "../../domain/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
    private ormRepository = AppDataSource.getRepository(User)

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({ where: { email } })
        return user || null
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOneBy({ id });
        return user;
    }

    public async save(user: User): Promise<User> {
        const savedUser = await this.ormRepository.save(user);
        return savedUser;
    }
}