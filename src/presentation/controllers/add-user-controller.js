import { badRequest, created, serverError } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class AddUserController {
  #REQUIRED_FIELDS = ['username', 'password'];
  #addUserUsecase;

  constructor({ addUserUsecase }) {
    this.#addUserUsecase = addUserUsecase;
  }

  async handle(request) {
    try {
      const validation = this.#validateRequest(request);
      if (validation instanceof Error) return badRequest(validation);
      const result = await this.#addUserUsecase.handle(request);
      if (result instanceof Error) return badRequest(result);
      return created(result);
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
