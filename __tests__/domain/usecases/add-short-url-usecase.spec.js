import AddShortUrlUsecase from '@/domain/usecases/add-short-url-usecase.js';

class CheckShortUrlByCodeRepositoryStub {
  async checkByCode(code) {
    return false;
  }
}

const makeSut = () => {
  const checkShortUrlByCodeRepository = new CheckShortUrlByCodeRepositoryStub();
  const sut = new AddShortUrlUsecase({ checkShortUrlByCodeRepository });
  return {
    checkShortUrlByCodeRepository,
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
    await sut.handle({
      url: 'full-url',
      shortCode: 'short-code',
      validityInDays: 5,
    });
    expect(checkShortUrlSpy).toHaveBeenCalledWith('short-code');
  });
});

/*
deve receber os parâmetros,
checar se já não existe uma url com o código cadastrado
se a validade for informada, gerar a data de expiração
cadastrar a url e retornar as suas informações
*/
