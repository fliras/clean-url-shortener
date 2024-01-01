import { badRequest, serverError, ok } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class UserLoginController {
  #userLoginUsecase;
  #REQUIRED_FIELDS = ['username', 'password'];

  constructor({ userLoginUsecase }) {
    this.#userLoginUsecase = userLoginUsecase;
  }

  async handle({ username, password }) {
    try {
      const validation = this.#validateRequest({ username, password });
      if (validation instanceof Error) return badRequest(validation);
      const result = await this.#userLoginUsecase.handle({
        username,
        password,
      });
      if (result instanceof Error) return badRequest(result);
      return ok({ token: result });
    } catch (error) {
      return serverError();
    }
  }

  #validateRequest(request) {
    for (const field of this.#REQUIRED_FIELDS) {
      const fieldIsMissing = !request[field];
      if (fieldIsMissing) return new MissingParamError(field);
    }
  }
}
