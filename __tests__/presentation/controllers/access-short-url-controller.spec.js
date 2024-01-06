import AccessShortUrlController from '@/presentation/controllers/access-short-url-controller.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import {
  ObtainUrlFromAValidShortUrlUsecaseStub,
  IncrementShortUrlClicksUsecaseStub,
} from '@/tests/presentation/mocks/short-urls.js';
import { mockThrow } from '@/tests/helpers.js';
import {
  badRequest,
  serverError,
  redirect,
} from '@/presentation/helpers/http.js';

const makeSut = () => {
  const obtainUrlFromAValidShortUrlUsecase =
    new ObtainUrlFromAValidShortUrlUsecaseStub();
  const incrementShortUrlClicksUsecase =
    new IncrementShortUrlClicksUsecaseStub();
  const sut = new AccessShortUrlController({
    obtainUrlFromAValidShortUrlUsecase,
    incrementShortUrlClicksUsecase,
  });
  return {
    obtainUrlFromAValidShortUrlUsecase,
    incrementShortUrlClicksUsecase,
    sut,
  };
};

const mockRequest = () => ({
  shortCode: 'any-code',
});

describe('AccessShortUrlController', () => {
  it('Should return badRequest if shortCode is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({});
    expect(output).toEqual(badRequest(new MissingParamError('shortCode')));
  });

  it('Should call obtainUrlFromAValidShortUrlUsecase with correct values', async () => {
    const { obtainUrlFromAValidShortUrlUsecase, sut } = makeSut();
    const loadShortUrlSpy = jest.spyOn(
      obtainUrlFromAValidShortUrlUsecase,
      'handle',
    );
    await sut.handle(mockRequest());
    expect(loadShortUrlSpy).toHaveBeenCalledWith('any-code');
  });

  it('Should return badRequest if obtainUrlFromAValidShortUrlUsecase returns an error', async () => {
    const { obtainUrlFromAValidShortUrlUsecase, sut } = makeSut();
    const error = new Error('any-error');
    jest
      .spyOn(obtainUrlFromAValidShortUrlUsecase, 'handle')
      .mockResolvedValueOnce(error);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(badRequest(error));
  });

  it('Should return serverError if obtainUrlFromAValidShortUrlUsecase throws', async () => {
    const { obtainUrlFromAValidShortUrlUsecase, sut } = makeSut();
    jest
      .spyOn(obtainUrlFromAValidShortUrlUsecase, 'handle')
      .mockImplementationOnce(mockThrow);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(serverError());
  });

  it('Should call incrementShortUrlClicksUsecase with correct values', async () => {
    const { incrementShortUrlClicksUsecase, sut } = makeSut();
    const incrementShortUrlSpy = jest.spyOn(
      incrementShortUrlClicksUsecase,
      'handle',
    );
    const request = mockRequest();
    await sut.handle(request);
    expect(incrementShortUrlSpy).toHaveBeenCalledWith(request.shortCode);
  });

  it('Should return serverError if incrementShortUrlClicksUsecase throws', async () => {
    const { incrementShortUrlClicksUsecase, sut } = makeSut();
    jest
      .spyOn(incrementShortUrlClicksUsecase, 'handle')
      .mockImplementationOnce(mockThrow);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(serverError());
  });

  it('Should return redirect on success', async () => {
    const { obtainUrlFromAValidShortUrlUsecase, sut } = makeSut();
    const output = await sut.handle(mockRequest());
    const expectedOutput = obtainUrlFromAValidShortUrlUsecase.result.fullUrl;
    expect(output).toEqual(redirect(expectedOutput));
  });
});
