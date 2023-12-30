import AuthenticationMiddleware from '@/presentation/middlewares/authentication-middleware';
import { unauthorized } from '@/presentation/helpers/http.js';

describe('AuthenticationMiddleware', () => {
  it('Should return UnauthorizedError if accessToken is not provided', async () => {
    const sut = new AuthenticationMiddleware();
    const output = await sut.handle({});
    expect(output).toEqual(unauthorized());
  });
});
