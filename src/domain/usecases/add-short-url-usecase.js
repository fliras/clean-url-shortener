export default class AddShortUrlUsecase {
  #checkShortUrlByCodeRepository;
  #timestampAdder;

  constructor({ checkShortUrlByCodeRepository, timestampAdder }) {
    this.#checkShortUrlByCodeRepository = checkShortUrlByCodeRepository;
    this.#timestampAdder = timestampAdder;
  }

  async handle({ url, shortCode, validityInDays }) {
    const shortCodeAlreadyInUse =
      await this.#checkShortUrlByCodeRepository.checkByCode(shortCode);
    if (shortCodeAlreadyInUse) return new Error('Code already in use');
    if (validityInDays) this.#timestampAdder.addDays(validityInDays);
  }
}
