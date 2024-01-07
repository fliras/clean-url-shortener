import AddUserUsecase from '@/domain/usecases/add-user-usecase.js';
import { CheckUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';
import UsernameAlreadyInUseError from '@/domain/errors/username-already-in-use-error.js';
import { mockThrow } from '@/tests/helpers.js';

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

  it('Should return UsernameAlreadyInUseError if checkUserByUsernameRepository returns true', async () => {
    const { checkUserByUsernameRepository, sut } = makeSut();
    jest
      .spyOn(checkUserByUsernameRepository, 'checkByUsername')
      .mockResolvedValueOnce(true);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new UsernameAlreadyInUseError());
  });

  it('Should throw if checkUserByUsernameRepository throws', async () => {
    const { checkUserByUsernameRepository, sut } = makeSut();
    jest
      .spyOn(checkUserByUsernameRepository, 'checkByUsername')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });
});
