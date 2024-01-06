import AccessShortUrlController from '@/presentation/controllers/access-short-url-controller.js';
import { badRequest, serverError } from '@/presentation/helpers/http.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import { LoadShortUrlByCodeUsecaseStub } from '@/tests/presentation/mocks/short-urls.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const loadShortUrlByCodeUsecase = new LoadShortUrlByCodeUsecaseStub();
  const sut = new AccessShortUrlController({ loadShortUrlByCodeUsecase });
  return {
    loadShortUrlByCodeUsecase,
    sut,
  };
};

describe('AccessShortUrlController', () => {
  it('Should return badRequest if shortCode is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({});
    expect(output).toEqual(badRequest(new MissingParamError('shortCode')));
  });

  it('Should call loadShortUrlByCodeUsecase with correct values', async () => {
    const { loadShortUrlByCodeUsecase, sut } = makeSut();
    const loadShortUrlSpy = jest.spyOn(loadShortUrlByCodeUsecase, 'handle');
    await sut.handle({ shortCode: 'any-code' });
    expect(loadShortUrlSpy).toHaveBeenCalledWith('any-code');
  });

  it('Should return badRequest if loadShortUrlByCodeUsecase returns an error', async () => {
    const { loadShortUrlByCodeUsecase, sut } = makeSut();
    const error = new Error('any-error');
    jest
      .spyOn(loadShortUrlByCodeUsecase, 'handle')
      .mockResolvedValueOnce(error);
    const output = await sut.handle({ shortCode: 'any-code' });
    expect(output).toEqual(badRequest(error));
  });

  it('Should return serverError if loadShortUrlByCodeUsecase throws', async () => {
    const { loadShortUrlByCodeUsecase, sut } = makeSut();
    jest
      .spyOn(loadShortUrlByCodeUsecase, 'handle')
      .mockImplementationOnce(mockThrow);
    const output = await sut.handle({ shortCode: 'any-code' });
    expect(output).toEqual(serverError());
  });
});
