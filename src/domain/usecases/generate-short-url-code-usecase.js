export default class GenerateShortUrlCodeUsecase {
  #uniqueCodeGenerator;

  constructor({ uniqueCodeGenerator }) {
    this.#uniqueCodeGenerator = uniqueCodeGenerator;
  }

  async handle(shortCodeLength) {
    const shortCode = this.#uniqueCodeGenerator.generate(shortCodeLength);
    return shortCode;
  }
}
