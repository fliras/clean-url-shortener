import { badRequest, serverError } from '../helpers/http.js';
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
      const userLogin = await this.#userLoginUsecase.handle({
        username,
        password,
      });
      if (userLogin instanceof Error) return badRequest(userLogin);
    } catch (error) {
      return serverError();
    }
  }
}
