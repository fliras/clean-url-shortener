import { badRequest, serverError, ok } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class UserLoginController {
  #userLoginUsecase;

  constructor({ userLoginUsecase }) {
    this.#userLoginUsecase = userLoginUsecase;
  }

  async handle({ username, password }) {
    try {
      if (!username) return badRequest(new MissingParamError('username'));
      if (!password) return badRequest(new MissingParamError('password'));
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
}
