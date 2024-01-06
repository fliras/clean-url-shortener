import MissingParamError from '../errors/missing-param-error.js';
import { badRequest, serverError, redirect } from '../helpers/http.js';

export default class AccessShortUrlController {
  #loadShortUrlByCodeUsecase;
  #incrementShortUrlClicksUsecase;

  constructor({ loadShortUrlByCodeUsecase, incrementShortUrlClicksUsecase }) {
    this.#loadShortUrlByCodeUsecase = loadShortUrlByCodeUsecase;
    this.#incrementShortUrlClicksUsecase = incrementShortUrlClicksUsecase;
  }

  async handle({ shortCode }) {
    try {
      if (!shortCode) return badRequest(new MissingParamError('shortCode'));
      const shortUrl = await this.#loadShortUrlByCodeUsecase.handle(shortCode);
      if (shortUrl instanceof Error) return badRequest(shortUrl);
      await this.#incrementShortUrlClicksUsecase.handle();
      return redirect(shortUrl.fullUrl);
    } catch (error) {
      return serverError();
    }
  }
}
