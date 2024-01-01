import { badRequest } from '../helpers/http.js';
import MissingParamError from '../errors/missing-param-error.js';

export default class UserLoginController {
  async handle({ username, password }) {
    if (!username) return badRequest(new MissingParamError('username'));
    if (!password) return badRequest(new MissingParamError('password'));
  }
}
