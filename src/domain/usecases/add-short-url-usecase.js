export default class AddShortUrlUsecase {
  #checkShortUrlByCodeRepository;

  constructor({ checkShortUrlByCodeRepository }) {
    this.#checkShortUrlByCodeRepository = checkShortUrlByCodeRepository;
  }

  async handle({ url, shortCode, validityInDays }) {
    const shortCodeAlreadyInUse =
      await this.#checkShortUrlByCodeRepository.checkByCode(shortCode);
    if (shortCodeAlreadyInUse) {
      return new Error('Code already in use');
    }
  }
}
