import AddUserUsecase from '@/domain/usecases/add-user-usecase.js';
import UsernameAlreadyInUseError from '@/domain/errors/username-already-in-use-error.js';
import { mockThrow } from '@/tests/helpers.js';
import { HasherStub } from '@/tests/domain/mocks/cripto.js';
import {
  CheckUserByUsernameRepositoryStub,
  AddUserRepositoryStub,
} from '@/tests/domain/mocks/database.js';

const makeSut = () => {
  const checkUserByUsernameRepository = new CheckUserByUsernameRepositoryStub();
  const hasher = new HasherStub();
  const addUserRepository = new AddUserRepositoryStub();
  const sut = new AddUserUsecase({
    checkUserByUsernameRepository,
    hasher,
    addUserRepository,
  });
  return {
    checkUserByUsernameRepository,
    hasher,
    addUserRepository,
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

  it('Should throw if hasher throws', async () => {
    const { hasher, sut } = makeSut();
    jest.spyOn(hasher, 'hash').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should call addUserRepository with the correct values', async () => {
    const { addUserRepository, hasher, sut } = makeSut();
    const addUserSpy = jest.spyOn(addUserRepository, 'add');
    const request = mockInput();
    await sut.handle(request);
    expect(addUserSpy).toHaveBeenCalledWith({
      username: request.username,
      password: hasher.result,
    });
  });

  it('Should throw if addUserRepository throws', async () => {
    const { addUserRepository, sut } = makeSut();
    jest.spyOn(addUserRepository, 'add').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should return an user on success', async () => {
    const { addUserRepository, sut } = makeSut();
    const output = await sut.handle(mockInput());
    expect(output).toEqual({
      ...addUserRepository.result,
      password: undefined,
    });
  });
});
