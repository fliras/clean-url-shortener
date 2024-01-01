import { badRequest } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class UserLoginController {
  async handle({ username }) {
    if (!username) {
      return badRequest(new MissingParamError('username'));
    }
  }
}
