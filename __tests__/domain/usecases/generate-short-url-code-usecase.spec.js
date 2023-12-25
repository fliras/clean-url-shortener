import GenerateShortUrlCodeUsecase from '@/domain/usecases/generate-short-url-code-usecase.js';
import UniqueCodeGenerator from '@/infra/cripto/unique-code-generator.js';

const makeSut = () => {
  const shortCodeLength = 13;
  const uniqueCodeGenerator = new UniqueCodeGenerator();
  const sut = new GenerateShortUrlCodeUsecase({
    shortCodeLength,
    uniqueCodeGenerator,
  });
  return {
    shortCodeLength,
    uniqueCodeGenerator,
    sut,
  };
};

describe('GenerateShortUrlCodeUsecase', () => {
  it('Should call uniqueCodeGenerator with correct values', async () => {
    const { sut, shortCodeLength, uniqueCodeGenerator } = makeSut();
    const codeGeneratorSpy = jest.spyOn(uniqueCodeGenerator, 'generate');
    await sut.handle(shortCodeLength);
    expect(codeGeneratorSpy).toHaveBeenCalledWith(shortCodeLength);
  });

  it('Should return a shortCode according to the specified length', async () => {
    const { sut, shortCodeLength } = makeSut();
    const response = await sut.handle(shortCodeLength);
    expect(response.length).toBe(shortCodeLength);
  });

  it('Should throw if UniqueCodeGenerator throws', async () => {
    const { sut, shortCodeLength, uniqueCodeGenerator } = makeSut();
    jest.spyOn(uniqueCodeGenerator, 'generate').mockImplementationOnce(() => {
      throw new Error();
    });
    const response = sut.handle(shortCodeLength);
    expect(response).rejects.toThrow();
  });
});
