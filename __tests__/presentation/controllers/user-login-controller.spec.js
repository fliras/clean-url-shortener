import UserLoginController from '@/presentation/controllers/user-login-controller.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import { badRequest } from '@/presentation/helpers/http.js';
import { UserLoginUsecaseStub } from '@/tests/presentation/mocks/users.js';

describe('UserLoginController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const sut = new UserLoginController({});
    const output = await sut.handle({ password: 'any-password' });
    expect(output).toEqual(badRequest(new MissingParamError('username')));
  });

  it('Should return badRequest if password is not provided', async () => {
    const sut = new UserLoginController({});
    const output = await sut.handle({ username: 'any-username' });
    expect(output).toEqual(badRequest(new MissingParamError('password')));
  });

  it('Should call UserLoginUsecase with the correct values', async () => {
    const userLoginUsecase = new UserLoginUsecaseStub();
    const sut = new UserLoginController({ userLoginUsecase });
    const userLoginSpy = jest.spyOn(userLoginUsecase, 'handle');
    const request = { username: 'any-username', password: 'any-password' };
    await sut.handle(request);
    expect(userLoginSpy).toHaveBeenCalledWith(request);
  });
});
