export default class AddShortUrlUsecase {
  #checkShortUrlByCodeRepository;

  constructor({ checkShortUrlByCodeRepository }) {
    this.#checkShortUrlByCodeRepository = checkShortUrlByCodeRepository;
  }

  async handle({ url, shortCode, validityInDays }) {
    await this.#checkShortUrlByCodeRepository.checkByCode(shortCode);
  }
}
