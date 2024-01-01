import UserLoginUsecase from '@/domain/usecases/user-login-usecase.js';
import { LoadUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';
import UserNotFoundError from '@/domain/errors/user-not-found-error.js';

const makeSut = () => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const sut = new UserLoginUsecase({ loadUserByUsernameRepository });
  return {
    loadUserByUsernameRepository,
    sut,
  };
};

describe('UserLoginUsecase', () => {
  it('Should call LoadUserByUsernameRepository with the correct values', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    const loadUserSpy = jest.spyOn(
      loadUserByUsernameRepository,
      'loadByUsername',
    );
    await sut.handle({ username: 'any-username', password: 'any-password' });
    expect(loadUserSpy).toHaveBeenCalledWith('any-username');
  });

  it('Should return UserNotFoundError if LoadUserByUsernameRepository returns null', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    jest
      .spyOn(loadUserByUsernameRepository, 'loadByUsername')
      .mockResolvedValueOnce(null);
    const output = await sut.handle({
      username: 'any-username',
      password: 'any-password',
    });
    expect(output).toEqual(new UserNotFoundError());
  });
});
