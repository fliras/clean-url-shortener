import { unauthorized, ok, serverError } from '../helpers/http.js';

export default class AuthenticationMiddleware {
  #loadUserByTokenUsecase;

  constructor({ loadUserByTokenUsecase }) {
    this.#loadUserByTokenUsecase = loadUserByTokenUsecase;
  }

  async handle({ accessToken }) {
    try {
      if (!accessToken) return unauthorized();
      const loadedUser = await this.#loadUserByTokenUsecase.handle(accessToken);
      if (loadedUser instanceof Error) return unauthorized();
      return ok({ userId: loadedUser.user_id });
    } catch (error) {
      return serverError();
    }
  }
}
