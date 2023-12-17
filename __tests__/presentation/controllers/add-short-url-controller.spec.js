import AddShortUrlController from '../../../src/presentation/controllers/add-short-url-controller.js';
import { badRequest } from '../../../src/presentation/helpers/http.js';

class GenerateShortUrlCodeUsecaseStub {
  async handle() {
    return 'random-short-code';
  }
}

class AddShortUrlUsecaseStub {
  async handle() {
    return {
      id: 1,
      fullUrl: 'full-url',
      shortCode: 'short-code',
      expirationDate: new Date(),
    };
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

  it('Should call AddShortUrlUsecase with correct values', async () => {
    const { sut, addShortUrlUsecase } = makeSut();
    const addShortUrlSpy = jest.spyOn(addShortUrlUsecase, 'handle');
    await sut.handle({ body: { url: 'full-url' } });
    expect(addShortUrlSpy).toHaveBeenCalledWith({
      url: 'full-url',
      shortCode: 'random-short-code',
    });
    await sut.handle({ body: { url: 'full-url', shortCode: 'custom-code' } });
    expect(addShortUrlSpy).toHaveBeenCalledWith({
      url: 'full-url',
      shortCode: 'custom-code',
    });
  });
});
