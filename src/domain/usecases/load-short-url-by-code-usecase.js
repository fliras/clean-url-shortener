export default class LoadShortUrlByCodeUsecase {
  #loadShortUrlByCodeRepository;

  constructor({ loadShortUrlByCodeRepository }) {
    this.#loadShortUrlByCodeRepository = loadShortUrlByCodeRepository;
  }

  async handle(shortCode) {
    await this.#loadShortUrlByCodeRepository.loadByCode(shortCode);
  }
}
