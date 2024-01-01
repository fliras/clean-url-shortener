import UserLoginController from '@/presentation/controllers/user-login-controller.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import { badRequest } from '@/presentation/helpers/http.js';

describe('UserLoginController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const sut = new UserLoginController();
    const output = await sut.handle({ password: 'any-password' });
    expect(output).toEqual(badRequest(new MissingParamError('username')));
  });
});
