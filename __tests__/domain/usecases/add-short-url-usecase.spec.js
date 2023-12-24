import AddShortUrlUsecase from '@/domain/usecases/add-short-url-usecase.js';

class TimestampAdderStub {
  addedTimestamp = new Date();

  addDays() {
    return this.addedTimestamp;
  }
}

class CheckShortUrlByCodeRepositoryStub {
  async checkByCode() {
    return false;
  }
}

const mockRequest = () => ({
  url: 'full-url',
  shortCode: 'short-code',
  validityInDays: 5,
});

const makeSut = () => {
  const codeAlreadyInUseError = new Error('Code already in use');
  const checkShortUrlByCodeRepository = new CheckShortUrlByCodeRepositoryStub();
  const timestampAdder = new TimestampAdderStub();
  const sut = new AddShortUrlUsecase({
    checkShortUrlByCodeRepository,
    timestampAdder,
  });
  return {
    codeAlreadyInUseError,
    checkShortUrlByCodeRepository,
    timestampAdder,
    sut,
  };
};

describe('AddShortUrlUsecase', () => {
  it('Should call checkShortUrlByCodeRepository with correct values', async () => {
    const { checkShortUrlByCodeRepository, sut } = makeSut();
    const checkShortUrlSpy = jest.spyOn(
      checkShortUrlByCodeRepository,
      'checkByCode',
    );
    await sut.handle(mockRequest());
    expect(checkShortUrlSpy).toHaveBeenCalledWith('short-code');
  });

  it('Should return CodeAlreadyInUseError if CheckShortUrlByCodeRepository returns true', async () => {
    const { codeAlreadyInUseError, checkShortUrlByCodeRepository, sut } =
      makeSut();
    jest
      .spyOn(checkShortUrlByCodeRepository, 'checkByCode')
      .mockResolvedValueOnce(true);
    const output = sut.handle(mockRequest());
    expect(output).resolves.toEqual(codeAlreadyInUseError);
  });

  it('Should throw if CheckShortUrlByCodeRepository throws', async () => {
    const { checkShortUrlByCodeRepository, sut } = makeSut();
    jest
      .spyOn(checkShortUrlByCodeRepository, 'checkByCode')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const output = sut.handle(mockRequest());
    expect(output).rejects.toThrow();
  });

  it('Should call TimestampAdder with correct values if validityInDays is provided', async () => {
    const { timestampAdder, sut } = makeSut();
    const timestampAdderSpy = jest.spyOn(timestampAdder, 'addDays');
    await sut.handle(mockRequest());
    expect(timestampAdderSpy).toHaveBeenCalled();
  });

  it('Should call TimestampAdder with correct values', async () => {
    const { timestampAdder, sut } = makeSut();
    const timestampAdderSpy = jest.spyOn(timestampAdder, 'addDays');
    const request = mockRequest();
    await sut.handle(request);
    expect(timestampAdderSpy).toHaveBeenCalledWith(request.validityInDays);
  });
});

/*
deve receber os parâmetros,
checar se já não existe uma url com o código cadastrado
se a validade for informada, gerar a data de expiração
cadastrar a url e retornar as suas informações
*/
