import { unauthorized } from '../helpers/http.js';

export default class AuthenticationMiddleware {
  #checkUserByIdUsecase;

  constructor({ checkUserByIdUsecase }) {
    this.#checkUserByIdUsecase = checkUserByIdUsecase;
  }

  async handle({ accessToken }) {
    if (!accessToken) return unauthorized();
    await this.#checkUserByIdUsecase.handle(accessToken);
  }
}
