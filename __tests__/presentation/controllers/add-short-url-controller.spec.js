import AddShortUrlController from '@/presentation/controllers/add-short-url-controller.js';
import { badRequest, serverError, ok } from '@/presentation/helpers/http.js';

class GenerateShortUrlCodeUsecaseStub {
  async handle() {
    return 'random-short-code';
  }
}

class AddShortUrlUsecaseStub {
  result = {
    id: 1,
    fullUrl: 'full-url',
    shortCode: 'short-code',
    expirationDate: new Date(),
  };

  async handle() {
    return this.result;
  }
}

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
  body: {
    url: 'full-url',
    shortCode: 'short-code',
    validityInDays: new Date(),
  },
});

describe('AddShortUrlController', () => {
  it('Should return badRequest if url are not provided', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({ body: {} });
    expect(response).toEqual(
      badRequest(new Error('required fields not informed')),
    );
  });

  it('Should call GenerateShortUrlCodeUsecase if shortCode is not provided', async () => {
    const { sut, generateShortUrlCodeUsecase } = makeSut();
    const generateShortUrlCodeSpy = jest.spyOn(
      generateShortUrlCodeUsecase,
      'handle',
    );
    await sut.handle({ body: { url: 'full-url' } });
    expect(generateShortUrlCodeSpy).toHaveBeenCalled();
  });

  it('Should return serverError if GenerateShortUrlCodeUsecase throws', async () => {
    const { sut, generateShortUrlCodeUsecase } = makeSut();
    jest
      .spyOn(generateShortUrlCodeUsecase, 'handle')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const response = await sut.handle({ body: { url: 'full-url' } });
    expect(response).toEqual(serverError());
  });

  it('Should call AddShortUrlUsecase with correct values', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    const addShortUrlSpy = jest.spyOn(addShortUrlUsecase, 'handle');
    const request = mockRequest();
    await sut.handle(request);
    expect(addShortUrlSpy).toHaveBeenCalledWith(request.body);
  });

  it('Should return serverError if AddShortUrlUsecase throws', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    jest.spyOn(addShortUrlUsecase, 'handle').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError());
  });

  it('Should return ok on success', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(addShortUrlUsecase.result));
  });
});
