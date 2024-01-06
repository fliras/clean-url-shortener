import IncrementShortUrlClicksUsecase from '@/domain/usecases/increment-short-url-clicks-usecase.js';
import { IncrementShortUrlClicksRepositoryStub } from '@/tests/domain/mocks/database.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const incrementShortUrlClicksRepository =
    new IncrementShortUrlClicksRepositoryStub();
  const sut = new IncrementShortUrlClicksUsecase({
    incrementShortUrlClicksRepository,
  });
  return {
    incrementShortUrlClicksRepository,
    sut,
  };
};

const mockInput = () => 'any-code';

describe('IncrementShortUrlClicksUsecase', () => {
  it('Should call incrementShortUrlClicksRepository with correct values', async () => {
    const { incrementShortUrlClicksRepository, sut } = makeSut();
    const loadShortUrlSpy = jest.spyOn(
      incrementShortUrlClicksRepository,
      'incrementClicks',
    );
    await sut.handle(mockInput());
    expect(loadShortUrlSpy).toHaveBeenCalledWith(mockInput());
  });

  it('Should throw if incrementShortUrlClicksRepository throws', async () => {
    const { incrementShortUrlClicksRepository, sut } = makeSut();
    jest
      .spyOn(incrementShortUrlClicksRepository, 'incrementClicks')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });
});
