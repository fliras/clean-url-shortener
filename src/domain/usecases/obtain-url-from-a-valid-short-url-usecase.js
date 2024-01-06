import ShortUrlNotFoundError from '../errors/short-url-not-found-error.js';
import ExpiredShortUrlError from '../errors/expired-short-url-error.js';

export default class ObtainUrlFromAValidShortUrlUsecase {
  #loadShortUrlByCodeRepository;

  constructor({ loadShortUrlByCodeRepository }) {
    this.#loadShortUrlByCodeRepository = loadShortUrlByCodeRepository;
  }

  async handle(shortCode) {
    const shortUrl =
      await this.#loadShortUrlByCodeRepository.loadByCode(shortCode);
    if (!shortUrl) return new ShortUrlNotFoundError();
    const { expirationDate } = shortUrl;
    const urlIsExpired = expirationDate && new Date() > expirationDate;
    if (urlIsExpired) return new ExpiredShortUrlError();
    return shortUrl;
  }
}
