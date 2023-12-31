import jwt from 'jsonwebtoken';

export default class JwtAdapter {
  #secret;

  constructor({ secret }) {
    this.#secret = secret;
  }

  async decrypt(cipherText) {
    const payload = jwt.verify(cipherText, this.#secret);
    return payload;
  }

  async encrypt(payload) {
    const token = jwt.sign(payload, this.#secret);
    return token;
  }
}
