import MissingParamError from '../errors/missing-param-error.js';
import { badRequest, serverError, redirect } from '../helpers/http.js';

export default class AccessShortUrlController {
  #obtainUrlFromAValidShortUrlUsecase;
  #incrementShortUrlClicksUsecase;

  constructor({
    obtainUrlFromAValidShortUrlUsecase,
    incrementShortUrlClicksUsecase,
  }) {
    this.#obtainUrlFromAValidShortUrlUsecase =
      obtainUrlFromAValidShortUrlUsecase;
    this.#incrementShortUrlClicksUsecase = incrementShortUrlClicksUsecase;
  }

  async handle({ shortCode }) {
    try {
      if (!shortCode) return badRequest(new MissingParamError('shortCode'));
      const shortUrl =
        await this.#obtainUrlFromAValidShortUrlUsecase.handle(shortCode);
      if (shortUrl instanceof Error) return badRequest(shortUrl);
      await this.#incrementShortUrlClicksUsecase.handle(shortCode);
      return redirect(shortUrl.fullUrl);
    } catch (error) {
      return serverError();
    }
  }
}
