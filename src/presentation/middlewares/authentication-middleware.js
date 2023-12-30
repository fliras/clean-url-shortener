import { unauthorized } from '../helpers/http.js';

export default class AuthenticationMiddleware {
  #checkUserByTokenUsecase;

  constructor({ checkUserByTokenUsecase }) {
    this.#checkUserByTokenUsecase = checkUserByTokenUsecase;
  }

  async handle({ accessToken }) {
    if (!accessToken) return unauthorized();
    const userExists = await this.#checkUserByTokenUsecase.handle(accessToken);
    if (!userExists) return unauthorized();
  }
}
