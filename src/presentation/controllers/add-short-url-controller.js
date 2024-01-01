import { badRequest, created, serverError } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class AddShortUrlController {
  #generateShortUrlCodeUsecase;
  #addShortUrlUsecase;

  constructor({ generateShortUrlCodeUsecase, addShortUrlUsecase }) {
    this.#generateShortUrlCodeUsecase = generateShortUrlCodeUsecase;
    this.#addShortUrlUsecase = addShortUrlUsecase;
  }

  async handle({ userId, url, shortCode, validityInDays }) {
    try {
      if (!url) return badRequest(new MissingParamError('url'));
      const newShortCode =
        shortCode || (await this.#generateShortUrlCodeUsecase.handle());
      const newShortUrl = await this.#addShortUrlUsecase.handle({
        userId,
        url,
        shortCode: newShortCode,
        validityInDays,
      });
      if (newShortUrl instanceof Error) return badRequest(newShortUrl);
      return created(newShortUrl);
    } catch (error) {
      return serverError();
    }
  }
}
