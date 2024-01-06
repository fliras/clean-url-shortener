import ShortUrlNotFoundError from '../errors/short-url-not-found-error.js';

export default class LoadShortUrlByCodeUsecase {
  #loadShortUrlByCodeRepository;

  constructor({ loadShortUrlByCodeRepository }) {
    this.#loadShortUrlByCodeRepository = loadShortUrlByCodeRepository;
  }

  async handle(shortCode) {
    const shortUrl =
      await this.#loadShortUrlByCodeRepository.loadByCode(shortCode);
    if (!shortUrl) return new ShortUrlNotFoundError();
  }
}
