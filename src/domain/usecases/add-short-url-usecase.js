import CodeAlreadyInUseError from '../errors/code-already-in-use-error.js';

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

  async handle({ userId, url, shortCode, validityInDays }) {
    const shortCodeAlreadyInUse =
      await this.#checkShortUrlByCodeRepository.checkByCode(shortCode);
    if (shortCodeAlreadyInUse) return new CodeAlreadyInUseError();
    const expirationDate =
      validityInDays && this.#timestampAdder.addDays(validityInDays);
    const shortUrl = await this.#addShortUrlRepository.add({
      userId,
      url,
      shortCode,
      expirationDate,
    });
    return shortUrl;
  }
}
