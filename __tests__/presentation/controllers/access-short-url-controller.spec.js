import AccessShortUrlController from '@/presentation/controllers/access-short-url-controller.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import {
  LoadShortUrlByCodeUsecaseStub,
  IncrementShortUrlClicksUsecaseStub,
} from '@/tests/presentation/mocks/short-urls.js';
import { mockThrow } from '@/tests/helpers.js';
import {
  badRequest,
  serverError,
  redirect,
} from '@/presentation/helpers/http.js';

const makeSut = () => {
  const loadShortUrlByCodeUsecase = new LoadShortUrlByCodeUsecaseStub();
  const incrementShortUrlClicksUsecase =
    new IncrementShortUrlClicksUsecaseStub();
  const sut = new AccessShortUrlController({
    loadShortUrlByCodeUsecase,
    incrementShortUrlClicksUsecase,
  });
  return {
    loadShortUrlByCodeUsecase,
    incrementShortUrlClicksUsecase,
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

  it('Should call incrementShortUrlClicksUsecase', async () => {
    const { incrementShortUrlClicksUsecase, sut } = makeSut();
    const incrementShortUrlSpy = jest.spyOn(
      incrementShortUrlClicksUsecase,
      'handle',
    );
    await sut.handle({ shortCode: 'any-code' });
    expect(incrementShortUrlSpy).toHaveBeenCalled();
  });

  it('Should return redirect on success', async () => {
    const { loadShortUrlByCodeUsecase, sut } = makeSut();
    const output = await sut.handle({ shortCode: 'any-code' });
    const expectedOutput = loadShortUrlByCodeUsecase.result.fullUrl;
    expect(output).toEqual(redirect(expectedOutput));
  });
});
