import AuthenticationMiddleware from '@/presentation/middlewares/authentication-middleware';
import { unauthorized } from '@/presentation/helpers/http.js';

class CheckUserByIdUsecaseStub {
  async handle() {
    return true;
  }
}

const makeSut = () => {
  const checkUserByIdUsecase = new CheckUserByIdUsecaseStub();
  const sut = new AuthenticationMiddleware({ checkUserByIdUsecase });
  return {
    checkUserByIdUsecase,
    sut,
  };
};

describe('AuthenticationMiddleware', () => {
  it('Should return UnauthorizedError if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({});
    expect(output).toEqual(unauthorized());
  });

  it('Should call CheckUserByIdUsecase with correct values', async () => {
    const { checkUserByIdUsecase, sut } = makeSut();
    const checkUserSpy = jest.spyOn(checkUserByIdUsecase, 'handle');
    await sut.handle({ accessToken: 'any-token' });
    expect(checkUserSpy).toHaveBeenCalledWith('any-token');
  });

  it('Should return unauthorized if CheckUserByIdUsecase returns false', async () => {
    const { checkUserByIdUsecase, sut } = makeSut();
    jest.spyOn(checkUserByIdUsecase, 'handle').mockResolvedValueOnce(false);
    const output = await sut.handle({ accessToken: 'any-token' });
    expect(output).toEqual(unauthorized());
  });
});
