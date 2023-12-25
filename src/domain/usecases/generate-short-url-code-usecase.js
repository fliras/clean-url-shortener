export default class GenerateShortUrlCodeUsecase {
  #shortCodeLength;
  #uniqueCodeGenerator;

  constructor({ shortCodeLength, uniqueCodeGenerator }) {
    this.#shortCodeLength = shortCodeLength;
    this.#uniqueCodeGenerator = uniqueCodeGenerator;
  }

  async handle() {
    const shortCode = this.#uniqueCodeGenerator.generate(this.#shortCodeLength);
    return shortCode;
  }
}
