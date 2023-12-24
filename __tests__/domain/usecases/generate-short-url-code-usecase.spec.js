import GenerateShortUrlCodeUsecase from '@/domain/usecases/generate-short-url-code-usecase.js';
import UniqueCodeGenerator from '@/infra/cripto/unique-code-generator.js';

const makeSut = () => {
  const uniqueCodeGenerator = new UniqueCodeGenerator();
  const sut = new GenerateShortUrlCodeUsecase({ uniqueCodeGenerator });
  return {
    uniqueCodeGenerator,
    sut,
  };
};

describe('GenerateShortUrlCodeUsecase', () => {
  test('Should return a shortCode according to the specified length', async () => {
    const shortCodeLength = 13;
    const { sut } = makeSut();
    const response = await sut.handle(shortCodeLength);
    expect(response.length).toBe(shortCodeLength);
  });
});
