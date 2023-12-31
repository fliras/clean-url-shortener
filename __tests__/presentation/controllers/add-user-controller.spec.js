import AddUserController from '@/presentation/controllers/add-user-controller.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import { AddUserUsecaseStub } from '@/tests/presentation/mocks/users.js';
import { mockThrow } from '@/tests/helpers.js';
import {
  badRequest,
  serverError,
  created,
} from '@/presentation/helpers/http.js';

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

  it('Should return serverError if addUserUsecase throws', async () => {
    const { addUserUsecase, sut } = makeSut();
    jest.spyOn(addUserUsecase, 'handle').mockImplementationOnce(mockThrow);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(serverError());
  });

  it('Should return created on success', async () => {
    const { addUserUsecase, sut } = makeSut();
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(created(addUserUsecase.result));
  });
});
