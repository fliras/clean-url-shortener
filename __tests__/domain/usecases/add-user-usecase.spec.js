import AddUserUsecase from '@/domain/usecases/add-user-usecase.js';
import { CheckUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';

const makeSut = () => {
  const checkUserByUsernameRepository = new CheckUserByUsernameRepositoryStub();
  const sut = new AddUserUsecase({ checkUserByUsernameRepository });
  return {
    checkUserByUsernameRepository,
    sut,
  };
};

const mockInput = () => ({
  username: 'any-username',
  password: 'any-password',
});

describe('AddUserUsecase', () => {
  it('Should call CheckUserByUsernameRepository with the correct values', async () => {
    const { checkUserByUsernameRepository, sut } = makeSut();
    const checkUserSpy = jest.spyOn(
      checkUserByUsernameRepository,
      'checkByUsername',
    );
    const request = mockInput();
    await sut.handle(request);
    expect(checkUserSpy).toHaveBeenCalledWith(request.username);
  });
});
