import MissingParamError from '../errors/missing-param-error.js';
import { badRequest } from '../helpers/http.js';

export default class AccessShortUrlController {
  #loadShortUrlByCodeUsecase;

  constructor({ loadShortUrlByCodeUsecase }) {
    this.#loadShortUrlByCodeUsecase = loadShortUrlByCodeUsecase;
  }

  async handle({ shortCode }) {
    if (!shortCode) return badRequest(new MissingParamError('shortCode'));
    await this.#loadShortUrlByCodeUsecase.handle(shortCode);
  }
}
