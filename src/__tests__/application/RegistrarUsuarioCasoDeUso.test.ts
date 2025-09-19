import { IUserRepository } from '../../repositories/User/IUserRepository';
import { IAccountRepository } from '../../repositories/Account/IAccountRepository';
import { User } from '../../domain/User';
import { Account } from '../../domain/Account';

const mockUserRepository: IUserRepository = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
};

const mockAccountRepository: IAccountRepository = {
    findById: jest.fn(),
    findByUserId: jest.fn(),
    save: jest.fn(),
};

describe('Caso de Uso: Registrar Usuário', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve registrar um novo usuário e criar uma conta padrão com sucesso', async () => {
        // --- PREPARAÇÃO (Arrange) ---
        const input = { name: "John Doe", email: "john.doe@example.com", password: "password123" };

        // Configurando o comportamento dos mocks para este teste
        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        (mockUserRepository.save as jest.Mock).mockImplementation(user => Promise.resolve(user));
        (mockAccountRepository.save as jest.Mock).mockImplementation(account => Promise.resolve(account));

        // Instanciando o caso de uso com os mocks (Injeção de Dependência)
        const casoDeUso = new RegistrarUsuarioCasoDeUso(mockUserRepository, mockAccountRepository);

        // --- AÇÃO (Act) ---
        const result = await casoDeUso.executar(input);

        // --- VERIFICAÇÃO (Assert) ---
        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe(input.name);

        // Verifica se os métodos dos mocks foram chamados como esperado
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(mockUserRepository.save).toHaveBeenCalled();
        expect(mockAccountRepository.save).toHaveBeenCalled();

        // Verifica se a conta criada tem o nome padrão "Carteira"
        const accountArg = (mockAccountRepository.save as jest.Mock).mock.calls[0][0];
        expect(accountArg).toBeInstanceOf(Account);
        expect(accountArg.name).toBe("Carteira");
        expect(accountArg.user.name).toBe(input.name);
    });

    it('deve lançar um erro se o email já estiver em uso', async () => {
        // --- PREPARAÇÃO (Arrange) ---
        const input = { name: "John Doe", email: "john.doe@example.com", password: "password123" };
        const existingUser = new User("John Doe", "john.doe@example.com");

        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(existingUser);

        const casoDeUso = new RegistrarUsuarioCasoDeUso(mockUserRepository, mockAccountRepository);

        // --- AÇÃO E VERIFICAÇÃO (Act & Assert) ---
        await expect(casoDeUso.executar(input)).rejects.toThrow("Email já está em uso.");

        // Garante que, se o email existe, nenhum usuário ou conta nova é salvo
        expect(mockUserRepository.save).not.toHaveBeenCalled();
        expect(mockAccountRepository.save).not.toHaveBeenCalled();
    });

})