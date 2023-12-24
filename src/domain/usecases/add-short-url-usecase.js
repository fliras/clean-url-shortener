export default class AddShortUrlUsecase {
  #checkShortUrlByCodeRepository;
  #timestampAdder;
  #addShortUrlRepository;

  constructor({
    checkShortUrlByCodeRepository,
    timestampAdder,
    addShortUrlRepository,
  }) {
    this.#checkShortUrlByCodeRepository = checkShortUrlByCodeRepository;
    this.#timestampAdder = timestampAdder;
    this.#addShortUrlRepository = addShortUrlRepository;
  }

  async handle({ url, shortCode, validityInDays }) {
    const shortCodeAlreadyInUse =
      await this.#checkShortUrlByCodeRepository.checkByCode(shortCode);
    if (shortCodeAlreadyInUse) return new Error('Code already in use');
    if (validityInDays) this.#timestampAdder.addDays(validityInDays);
    const expirationDate =
      validityInDays && this.#timestampAdder.addDays(validityInDays);
    this.#addShortUrlRepository.add({ url, shortCode, expirationDate });
  }
}
