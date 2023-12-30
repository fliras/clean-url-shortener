import LoadUserByTokenUsecase from '@/domain/usecases/load-user-by-token-usecase.js';
import InvalidTokenError from '@/domain/errors/invalid-token-error.js';
import UserNotFoundError from '@/domain/errors/user-not-found-error.js';

class DecrypterStub {
  result = { userId: 1 };

  async decrypt() {
    return this.result;
  }
}

class LoadUserByIdRepositoryStub {
  result = {
    id: 1,
    username: 'user01',
    password: 'hashed-password',
    created_at: new Date(),
  };

  async handle() {
    return this.result;
  }
}

const makeSut = () => {
  const decrypter = new DecrypterStub();
  const loadUserByIdRepository = new LoadUserByIdRepositoryStub();
  const sut = new LoadUserByTokenUsecase({ decrypter, loadUserByIdRepository });
  return {
    decrypter,
    loadUserByIdRepository,
    sut,
  };
};

const mockThrow = () => {
  throw new Error();
};

const mockInput = () => 'access-token';

describe('LoadUserByTokenUsecase', () => {
  it('Should call decrypter with correct values', async () => {
    const { decrypter, sut } = makeSut();
    const decrypterSpy = jest.spyOn(decrypter, 'decrypt');
    await sut.handle(mockInput());
    expect(decrypterSpy).toHaveBeenCalledWith(mockInput());
  });

  it('Should return InvalidTokenError if decrypter returns false', async () => {
    const { decrypter, sut } = makeSut();
    jest.spyOn(decrypter, 'decrypt').mockResolvedValueOnce(false);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new InvalidTokenError());
  });

  it('Should throw if decrypter throws', async () => {
    const { decrypter, sut } = makeSut();
    jest.spyOn(decrypter, 'decrypt').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should call LoadUserByIdRepository with correct values', async () => {
    const { loadUserByIdRepository, decrypter, sut } = makeSut();
    const loadUserSpy = jest.spyOn(loadUserByIdRepository, 'handle');
    await sut.handle(mockInput());
    expect(loadUserSpy).toHaveBeenCalledWith(decrypter.result.userId);
  });

  it('Should return UserNotFoundError if LoadUserByIdRepository returns null', async () => {
    const { loadUserByIdRepository, sut } = makeSut();
    jest.spyOn(loadUserByIdRepository, 'handle').mockResolvedValueOnce(null);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new UserNotFoundError());
  });

  it('Should throw if LoadUserByIdRepository throws', async () => {
    const { loadUserByIdRepository, sut } = makeSut();
    jest
      .spyOn(loadUserByIdRepository, 'handle')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should return an user on success', async () => {
    const { sut, loadUserByIdRepository } = makeSut();
    const output = await sut.handle(mockInput());
    expect(output).toEqual(loadUserByIdRepository.result);
  });
});
