import UserLoginUsecase from '@/domain/usecases/user-login-usecase.js';
import { LoadUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';
import { HashComparerStub } from '@/tests/domain/mocks/cripto.js';
import UserNotFoundError from '@/domain/errors/user-not-found-error.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const hashComparer = new HashComparerStub();
  const sut = new UserLoginUsecase({
    loadUserByUsernameRepository,
    hashComparer,
  });
  return {
    loadUserByUsernameRepository,
    hashComparer,
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
});
