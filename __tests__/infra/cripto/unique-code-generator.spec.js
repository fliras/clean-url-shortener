import UniqueCodeGenerator from '@/infra/cripto/unique-code-generator.js';

const makeSut = () => {
  const codeLength = 20;
  const sut = new UniqueCodeGenerator();
  return {
    codeLength,
    sut,
  };
};

describe('UniqueCodeGenerator', () => {
  it('Should return a string according to the length specified', async () => {
    const { codeLength, sut } = makeSut();
    const result = await sut.generate(codeLength);
    expect(result.length).toBe(codeLength);
  });
});
