import { unauthorized } from '../helpers/http.js';

export default class AuthenticationMiddleware {
  async handle({ accessToken }) {
    if (!accessToken) return unauthorized();
  }
}
