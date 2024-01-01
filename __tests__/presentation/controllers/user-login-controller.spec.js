import UserLoginController from '@/presentation/controllers/user-login-controller.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import { badRequest, serverError } from '@/presentation/helpers/http.js';
import { UserLoginUsecaseStub } from '@/tests/presentation/mocks/users.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const userLoginUsecase = new UserLoginUsecaseStub();
  const sut = new UserLoginController({ userLoginUsecase });
  return {
    userLoginUsecase,
    sut,
  };
};

const mockRequest = () => ({
  username: 'any-username',
  password: 'any-password',
});

describe('UserLoginController', () => {
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

  it('Should call UserLoginUsecase with the correct values', async () => {
    const { userLoginUsecase, sut } = makeSut();
    const userLoginSpy = jest.spyOn(userLoginUsecase, 'handle');
    const request = mockRequest();
    await sut.handle(request);
    expect(userLoginSpy).toHaveBeenCalledWith(request);
  });

  it('Should return badRequest if UserLoginUsecase returns an Error', async () => {
    const { userLoginUsecase, sut } = makeSut();
    const error = new Error('error-message');
    jest.spyOn(userLoginUsecase, 'handle').mockResolvedValueOnce(error);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(badRequest(error));
  });

  it('Should return serverError if UserLoginUsecase throws', async () => {
    const { userLoginUsecase, sut } = makeSut();
    jest.spyOn(userLoginUsecase, 'handle').mockImplementationOnce(mockThrow);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(serverError());
  });
});
