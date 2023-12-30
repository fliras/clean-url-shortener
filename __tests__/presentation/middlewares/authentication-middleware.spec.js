import AuthenticationMiddleware from '@/presentation/middlewares/authentication-middleware';
import { unauthorized } from '@/presentation/helpers/http.js';
import { ok } from '../../../src/presentation/helpers/http';

class CheckUserByTokenUsecaseStub {
  user = { userId: 1 };

  async handle() {
    return this.user;
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

const mockThrow = () => {
  throw new Error();
};

const mockInput = () => ({
  accessToken: 'any-token',
});

describe('AuthenticationMiddleware', () => {
  it('Should return UnauthorizedError if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({});
    expect(output).toEqual(unauthorized());
  });

  it('Should call CheckUserByTokenUsecase with correct values', async () => {
    const { checkUserByTokenUsecase, sut } = makeSut();
    const checkUserSpy = jest.spyOn(checkUserByTokenUsecase, 'handle');
    const input = mockInput();
    await sut.handle(input);
    expect(checkUserSpy).toHaveBeenCalledWith(input.accessToken);
  });

  it('Should return unauthorized if CheckUserByTokenUsecase returns an Error', async () => {
    const { checkUserByTokenUsecase, sut } = makeSut();
    jest
      .spyOn(checkUserByTokenUsecase, 'handle')
      .mockResolvedValueOnce(new Error());
    const output = await sut.handle(mockInput());
    expect(output).toEqual(unauthorized());
  });

  it('Should throw if CheckUserByTokenUsecase throws', async () => {
    const { checkUserByTokenUsecase, sut } = makeSut();
    jest
      .spyOn(checkUserByTokenUsecase, 'handle')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should return ok on success', async () => {
    const { sut, checkUserByTokenUsecase } = makeSut();
    const output = await sut.handle(mockInput());
    expect(output).toEqual(ok({ userId: checkUserByTokenUsecase.user.id }));
  });
});
