import AuthenticationMiddleware from '@/presentation/middlewares/authentication-middleware';
import { unauthorized, ok, serverError } from '@/presentation/helpers/http.js';

class LoadUserByTokenUsecaseStub {
  user = { userId: 1 };

  async handle() {
    return this.user;
  }
}

const makeSut = () => {
  const loadUserByTokenUsecase = new LoadUserByTokenUsecaseStub();
  const sut = new AuthenticationMiddleware({ loadUserByTokenUsecase });
  return {
    loadUserByTokenUsecase,
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
  it('Should return unauthorized if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({});
    expect(output).toEqual(unauthorized());
  });

  it('Should call LoadUserByTokenUsecase with correct values', async () => {
    const { loadUserByTokenUsecase, sut } = makeSut();
    const checkUserSpy = jest.spyOn(loadUserByTokenUsecase, 'handle');
    const input = mockInput();
    await sut.handle(input);
    expect(checkUserSpy).toHaveBeenCalledWith(input.accessToken);
  });

  it('Should return unauthorized if LoadUserByTokenUsecase returns an Error', async () => {
    const { loadUserByTokenUsecase, sut } = makeSut();
    jest
      .spyOn(loadUserByTokenUsecase, 'handle')
      .mockResolvedValueOnce(new Error());
    const output = await sut.handle(mockInput());
    expect(output).toEqual(unauthorized());
  });

  it('Should return serverError if LoadUserByTokenUsecase throws', async () => {
    const { loadUserByTokenUsecase, sut } = makeSut();
    jest
      .spyOn(loadUserByTokenUsecase, 'handle')
      .mockImplementationOnce(mockThrow);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(serverError());
  });

  it('Should return ok on success', async () => {
    const { sut, loadUserByTokenUsecase } = makeSut();
    const output = await sut.handle(mockInput());
    expect(output).toEqual(ok({ userId: loadUserByTokenUsecase.user.id }));
  });
});
