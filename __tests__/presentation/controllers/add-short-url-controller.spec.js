import AddShortUrlController from '@/presentation/controllers/add-short-url-controller.js';
import { badRequest, serverError, ok } from '@/presentation/helpers/http.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';
import {
  GenerateShortUrlCodeUsecaseStub,
  AddShortUrlUsecaseStub,
} from '@/tests/presentation/mocks/short-urls.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const generateShortUrlCodeUsecase = new GenerateShortUrlCodeUsecaseStub();
  const addShortUrlUsecase = new AddShortUrlUsecaseStub();
  const sut = new AddShortUrlController({
    generateShortUrlCodeUsecase,
    addShortUrlUsecase,
  });
  return {
    sut,
    generateShortUrlCodeUsecase,
    addShortUrlUsecase,
  };
};

const mockRequest = () => ({
  url: 'full-url',
  shortCode: 'short-code',
  validityInDays: new Date(),
  userId: 1,
});

describe('AddShortUrlController', () => {
  it('Should return badRequest if url are not provided', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response).toEqual(badRequest(new MissingParamError('url')));
  });

  it('Should call GenerateShortUrlCodeUsecase if shortCode is not provided', async () => {
    const { sut, generateShortUrlCodeUsecase } = makeSut();
    const generateShortUrlCodeSpy = jest.spyOn(
      generateShortUrlCodeUsecase,
      'handle',
    );
    const request = { url: 'full-url' };
    await sut.handle(request);
    expect(generateShortUrlCodeSpy).toHaveBeenCalled();
  });

  it('Should return serverError if GenerateShortUrlCodeUsecase throws', async () => {
    const { sut, generateShortUrlCodeUsecase } = makeSut();
    jest
      .spyOn(generateShortUrlCodeUsecase, 'handle')
      .mockImplementationOnce(mockThrow);
    const request = { url: 'full-url' };
    const response = await sut.handle(request);
    expect(response).toEqual(serverError());
  });

  it('Should call AddShortUrlUsecase with correct values', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    const addShortUrlSpy = jest.spyOn(addShortUrlUsecase, 'handle');
    const request = mockRequest();
    await sut.handle(request);
    expect(addShortUrlSpy).toHaveBeenCalledWith(request);
  });

  it('Should return badRequest if AddShortUrlUsecase returns an error', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    const error = new Error();
    jest.spyOn(addShortUrlUsecase, 'handle').mockResolvedValueOnce(error);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(badRequest(error));
  });

  it('Should return serverError if AddShortUrlUsecase throws', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    jest.spyOn(addShortUrlUsecase, 'handle').mockImplementationOnce(mockThrow);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError());
  });

  it('Should return ok on success', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(addShortUrlUsecase.result));
  });
});
