import UserLoginUsecase from '@/domain/usecases/user-login-usecase.js';
import { LoadUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';
import UserNotFoundError from '@/domain/errors/user-not-found-error.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const sut = new UserLoginUsecase({ loadUserByUsernameRepository });
  return {
    loadUserByUsernameRepository,
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
});
