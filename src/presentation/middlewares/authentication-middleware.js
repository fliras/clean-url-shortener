import { unauthorized, ok } from '../helpers/http.js';

export default class AuthenticationMiddleware {
  #checkUserByTokenUsecase;

  constructor({ checkUserByTokenUsecase }) {
    this.#checkUserByTokenUsecase = checkUserByTokenUsecase;
  }

  async handle({ accessToken }) {
    if (!accessToken) return unauthorized();
    const loadedUser = await this.#checkUserByTokenUsecase.handle(accessToken);
    if (loadedUser instanceof Error) return unauthorized();
    return ok({ userId: loadedUser.user_id });
  }
}
