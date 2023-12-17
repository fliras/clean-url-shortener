import { badRequest, ok, serverError } from '../helpers/http.js';

export default class AddShortUrlController {
  #generateShortUrlCodeUsecase;
  #addShortUrlUsecase;

  constructor({ generateShortUrlCodeUsecase, addShortUrlUsecase }) {
    this.#generateShortUrlCodeUsecase = generateShortUrlCodeUsecase;
    this.#addShortUrlUsecase = addShortUrlUsecase;
  }

  async handle({ body: { url, shortCode, validityInDays } }) {
    try {
      if (!url) return badRequest(new Error('required fields not informed'));
      if (!shortCode) await this.#generateShortUrlCodeUsecase.handle();
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
