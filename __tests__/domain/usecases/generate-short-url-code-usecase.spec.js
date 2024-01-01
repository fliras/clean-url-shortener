import GenerateShortUrlCodeUsecase from '@/domain/usecases/generate-short-url-code-usecase.js';
import { UniqueCodeGeneratorStub } from '@/tests/domain/mocks/cripto.js';
import { mockThrow } from '@/tests/helpers.js';

const makeSut = () => {
  const shortCodeLength = 13;
  const uniqueCodeGenerator = new UniqueCodeGeneratorStub();
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

  it('Should throw if UniqueCodeGenerator throws', async () => {
    const { sut, shortCodeLength, uniqueCodeGenerator } = makeSut();
    jest
      .spyOn(uniqueCodeGenerator, 'generate')
      .mockImplementationOnce(mockThrow);
    const response = sut.handle(shortCodeLength);
    expect(response).rejects.toThrow();
  });

  it('Should return a string on success', async () => {
    const { sut, shortCodeLength } = makeSut();
    const response = await sut.handle(shortCodeLength);
    expect(typeof response).toBe('string');
  });
});
