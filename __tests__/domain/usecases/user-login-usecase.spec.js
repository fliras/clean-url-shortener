import UserLoginUsecase from '@/domain/usecases/user-login-usecase.js';
import { LoadUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';
import UserNotFoundError from '@/domain/errors/user-not-found-error.js';
import InvalidLoginError from '@/domain/errors/invalid-login-error.js';
import { mockThrow } from '@/tests/helpers.js';
import {
  HashComparerStub,
  EncrypterStub,
} from '@/tests/domain/mocks/cripto.js';

const makeSut = () => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const hashComparer = new HashComparerStub();
  const encrypter = new EncrypterStub();
  const sut = new UserLoginUsecase({
    loadUserByUsernameRepository,
    hashComparer,
    encrypter,
  });
  return {
    loadUserByUsernameRepository,
    hashComparer,
    encrypter,
    sut,
  };
};

const mockRequest = () => ({
  username: 'any-username',
  password: 'any-password',
});

describe('UserLoginUsecase', () => {
  it('Should call LoadUserByUsernameRepository with the correct values', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    const loadUserSpy = jest.spyOn(
      loadUserByUsernameRepository,
      'loadByUsername',
    );
    const request = mockRequest();
    await sut.handle(request);
    expect(loadUserSpy).toHaveBeenCalledWith(request.username);
  });

  it('Should return UserNotFoundError if LoadUserByUsernameRepository returns null', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    jest
      .spyOn(loadUserByUsernameRepository, 'loadByUsername')
      .mockResolvedValueOnce(null);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(new UserNotFoundError());
  });

  it('Should throw if LoadUserByUsernameRepository throws', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    jest
      .spyOn(loadUserByUsernameRepository, 'loadByUsername')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockRequest());
    expect(output).rejects.toThrow();
  });

  it('Should call hashComparer with the correct values', async () => {
    const { hashComparer, loadUserByUsernameRepository, sut } = makeSut();
    const hashComparerSpy = jest.spyOn(hashComparer, 'compare');
    const request = mockRequest();
    await sut.handle(request);
    const plaintextPassword = request.password;
    const hashedPassword = loadUserByUsernameRepository.result.password;
    expect(hashComparerSpy).toHaveBeenCalledWith(
      plaintextPassword,
      hashedPassword,
    );
  });

  it('Should throw if hashComparer throws', async () => {
    const { hashComparer, sut } = makeSut();
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockRequest());
    expect(output).rejects.toThrow();
  });

  it('Should return InvalidLoginError if hashComparer returns false', async () => {
    const { hashComparer, sut } = makeSut();
    jest.spyOn(hashComparer, 'compare').mockResolvedValueOnce(false);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(new InvalidLoginError());
  });

  it('Should call encrypter with the correct values', async () => {
    const { encrypter, loadUserByUsernameRepository, sut } = makeSut();
    const encrypterSpy = jest.spyOn(encrypter, 'encrypt');
    await sut.handle(mockRequest());
    const { userId } = loadUserByUsernameRepository.result;
    expect(encrypterSpy).toHaveBeenCalledWith({ userId });
  });
});
