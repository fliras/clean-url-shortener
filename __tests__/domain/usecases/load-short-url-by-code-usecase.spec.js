import LoadShortUrlByCodeUsecase from '@/domain/usecases/load-short-url-by-code-usecase.js';
import { LoadShortUrlByCodeRepositoryStub } from '@/tests/domain/mocks/database.js';

const makeSut = () => {
  const loadShortUrlByCodeRepository = new LoadShortUrlByCodeRepositoryStub();
  const sut = new LoadShortUrlByCodeUsecase({ loadShortUrlByCodeRepository });
  return {
    loadShortUrlByCodeRepository,
    sut,
  };
};

describe('LoadShortUrlByCodeUsecase', () => {
  it('Should call loadShortUrlByCodeRepository with correct values', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    const loadShortUrlSpy = jest.spyOn(
      loadShortUrlByCodeRepository,
      'loadByCode',
    );
    await sut.handle('any-code');
    expect(loadShortUrlSpy).toHaveBeenCalledWith('any-code');
  });
});
