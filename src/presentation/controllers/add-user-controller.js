import { badRequest, serverError } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class AddUserController {
  #REQUIRED_FIELDS = ['username', 'password'];
  #addUserUsecase;

  constructor({ addUserUsecase }) {
    this.#addUserUsecase = addUserUsecase;
  }

  async handle({ username, password }) {
    try {
      const validation = this.#validateRequest({ username, password });
      if (validation instanceof Error) return badRequest(validation);
      const result = await this.#addUserUsecase.handle({ username, password });
      if (result instanceof Error) return badRequest(result);
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
