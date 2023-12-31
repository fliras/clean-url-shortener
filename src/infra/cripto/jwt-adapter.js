import jwt from 'jsonwebtoken';

export default class JwtAdapter {
  #secret;

  constructor({ secret }) {
    this.#secret = secret;
  }

  async verify(token) {
    jwt.verify(token, this.#secret);
  }
}
