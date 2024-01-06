import LoadShortUrlByCodeUsecase from '@/domain/usecases/load-short-url-by-code-usecase.js';
import { LoadShortUrlByCodeRepositoryStub } from '@/tests/domain/mocks/database.js';
import ShortUrlNotFoundError from '@/domain/errors/short-url-not-found-error.js';
import ExpiredShortUrlError from '@/domain/errors/expired-short-url-error.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const loadShortUrlByCodeRepository = new LoadShortUrlByCodeRepositoryStub();
  const sut = new LoadShortUrlByCodeUsecase({ loadShortUrlByCodeRepository });
  return {
    loadShortUrlByCodeRepository,
    sut,
  };
};

const mockInput = () => 'any-code';

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const MOCKED_TIMESTAMP = new Date();

const mockExpiredShortUrl = (shortUrl) => {
  const expiredTimestamp = new Date(MOCKED_TIMESTAMP - ONE_DAY_IN_MILLISECONDS);
  return {
    ...shortUrl,
    expirationDate: expiredTimestamp,
  };
};

describe('LoadShortUrlByCodeUsecase', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(MOCKED_TIMESTAMP);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Should call loadShortUrlByCodeRepository with correct values', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    const loadShortUrlSpy = jest.spyOn(
      loadShortUrlByCodeRepository,
      'loadByCode',
    );
    await sut.handle(mockInput());
    expect(loadShortUrlSpy).toHaveBeenCalledWith(mockInput());
  });

  it('Should return ShortUrlNotFound if loadShortUrlByCodeRepository returns null', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    jest
      .spyOn(loadShortUrlByCodeRepository, 'loadByCode')
      .mockResolvedValueOnce(null);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new ShortUrlNotFoundError());
  });

  it('Should return ExpiredShortUrlError if the short url is expired', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    const expiredShortUrl = mockExpiredShortUrl(
      loadShortUrlByCodeRepository.result,
    );
    jest
      .spyOn(loadShortUrlByCodeRepository, 'loadByCode')
      .mockResolvedValueOnce(expiredShortUrl);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new ExpiredShortUrlError());
  });

  it('Should throw if loadShortUrlByCodeRepository throws', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    jest
      .spyOn(loadShortUrlByCodeRepository, 'loadByCode')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should return an short url on success', async () => {
    const { loadShortUrlByCodeRepository, sut } = makeSut();
    const output = await sut.handle(mockInput());
    expect(output).toEqual(loadShortUrlByCodeRepository.result);
  });
});
