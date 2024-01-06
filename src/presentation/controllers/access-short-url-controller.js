import MissingParamError from '../errors/missing-param-error.js';
import { badRequest, serverError, redirect } from '../helpers/http.js';

export default class AccessShortUrlController {
  #loadShortUrlByCodeUsecase;

  constructor({ loadShortUrlByCodeUsecase }) {
    this.#loadShortUrlByCodeUsecase = loadShortUrlByCodeUsecase;
  }

  async handle({ shortCode }) {
    try {
      if (!shortCode) return badRequest(new MissingParamError('shortCode'));
      const shortUrl = await this.#loadShortUrlByCodeUsecase.handle(shortCode);
      if (shortUrl instanceof Error) return badRequest(shortUrl);
      return redirect(shortUrl.fullUrl);
    } catch (error) {
      return serverError();
    }
  }
}
