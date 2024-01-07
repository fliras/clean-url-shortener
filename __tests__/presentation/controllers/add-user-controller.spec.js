import AddUserController from '@/presentation/controllers/add-user-controller.js';
import { badRequest } from '@/presentation/helpers/http.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import { AddUserUsecaseStub } from '@/tests/presentation/mocks/users.js';

const makeSut = () => {
  const addUserUsecase = new AddUserUsecaseStub();
  const sut = new AddUserController({ addUserUsecase });
  return {
    addUserUsecase,
    sut,
  };
};

const mockRequest = () => ({
  username: 'any-username',
  password: 'any-password',
});

describe('AddUserController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({ password: 'any-password' });
    expect(output).toEqual(badRequest(new MissingParamError('username')));
  });

  it('Should return badRequest if password is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({ username: 'any-username' });
    expect(output).toEqual(badRequest(new MissingParamError('password')));
  });

  it('Should call addUserUsecase with correct values', async () => {
    const { addUserUsecase, sut } = makeSut();
    const addUserSpy = jest.spyOn(addUserUsecase, 'handle');
    const request = mockRequest();
    await sut.handle(request);
    expect(addUserSpy).toHaveBeenCalledWith(request);
  });

  it('Should return badRequest if addUserUsecase returns an error', async () => {
    const { addUserUsecase, sut } = makeSut();
    const error = new Error('any-error');
    jest.spyOn(addUserUsecase, 'handle').mockResolvedValueOnce(error);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(badRequest(error));
  });
});
