import AddUserUsecase from '@/domain/usecases/add-user-usecase.js';
import UsernameAlreadyInUseError from '@/domain/errors/username-already-in-use-error.js';
import { mockThrow } from '@/tests/helpers.js';
import { CheckUserByUsernameRepositoryStub } from '@/tests/domain/mocks/database.js';
import { HasherStub } from '@/tests/domain/mocks/cripto.js';

const makeSut = () => {
  const checkUserByUsernameRepository = new CheckUserByUsernameRepositoryStub();
  const hasher = new HasherStub();
  const sut = new AddUserUsecase({ checkUserByUsernameRepository, hasher });
  return {
    checkUserByUsernameRepository,
    hasher,
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

  it('Should call hasher with the correct values', async () => {
    const { hasher, sut } = makeSut();
    const hasherSpy = jest.spyOn(hasher, 'hash');
    const request = mockInput();
    await sut.handle(request);
    expect(hasherSpy).toHaveBeenCalledWith(request.password);
  });
});
