import GenerateShortUrlCodeUsecase from '../../../../domain/usecases/generate-short-url-code-usecase.js';
import makeUniqueCodeGenerator from '../../infra/cripto/unique-code-generator.js';

const makeGenerateShortUrlCodeUsecase = () => {
  const shortCodeLength = 10;
  const uniqueCodeGenerator = makeUniqueCodeGenerator();
  return new GenerateShortUrlCodeUsecase({
    shortCodeLength,
    uniqueCodeGenerator,
  });
};

export default makeGenerateShortUrlCodeUsecase;
