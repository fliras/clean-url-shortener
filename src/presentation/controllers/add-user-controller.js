import { badRequest } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class AddUserController {
  #REQUIRED_FIELDS = ['username', 'password'];

  async handle({ username, password }) {
    const validation = this.#validateRequest({ username, password });
    if (validation instanceof Error) return badRequest(validation);
  }

  #validateRequest(request) {
    for (const field of this.#REQUIRED_FIELDS) {
      const fieldIsMissing = !request[field];
      if (fieldIsMissing) return new MissingParamError(field);
    }
  }
}
