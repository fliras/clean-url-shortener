import AuthenticationMiddleware from '@/presentation/middlewares/authentication-middleware';
import { unauthorized } from '@/presentation/helpers/http.js';

class CheckUserByTokenUsecaseStub {
  async handle() {
    return true;
  }
}

const makeSut = () => {
  const checkUserByTokenUsecase = new CheckUserByTokenUsecaseStub();
  const sut = new AuthenticationMiddleware({ checkUserByTokenUsecase });
  return {
    checkUserByTokenUsecase,
    sut,
  };
};

describe('AuthenticationMiddleware', () => {
  it('Should return UnauthorizedError if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({});
    expect(output).toEqual(unauthorized());
  });

  it('Should call CheckUserByTokenUsecase with correct values', async () => {
    const { checkUserByTokenUsecase, sut } = makeSut();
    const checkUserSpy = jest.spyOn(checkUserByTokenUsecase, 'handle');
    await sut.handle({ accessToken: 'any-token' });
    expect(checkUserSpy).toHaveBeenCalledWith('any-token');
  });

  it('Should return unauthorized if CheckUserByTokenUsecase returns false', async () => {
    const { checkUserByTokenUsecase, sut } = makeSut();
    jest.spyOn(checkUserByTokenUsecase, 'handle').mockResolvedValueOnce(false);
    const output = await sut.handle({ accessToken: 'any-token' });
    expect(output).toEqual(unauthorized());
  });
});
