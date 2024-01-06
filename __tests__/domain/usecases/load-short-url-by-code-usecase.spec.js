import LoadShortUrlByCodeUsecase from '@/domain/usecases/load-short-url-by-code-usecase.js';
import { LoadShortUrlByCodeRepositoryStub } from '@/tests/domain/mocks/database.js';
import ShortUrlNotFoundError from '@/domain/errors/short-url-not-found-error.js';

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

  it('Should return ShortUrlNotFound if loadShortUrlByCodeRepository returns null', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    jest
      .spyOn(loadShortUrlByCodeRepository, 'loadByCode')
      .mockResolvedValueOnce(null);
    const output = await sut.handle('any-code');
    expect(output).toEqual(new ShortUrlNotFoundError());
  });
});
