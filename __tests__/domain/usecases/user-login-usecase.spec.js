import UserLoginUsecase from '@/domain/usecases/user-login-usecase.js';
import { LoadUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';

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
});
