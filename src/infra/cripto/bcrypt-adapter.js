import bcrypt from 'bcrypt';

export default class BcryptAdapter {
  #salt;

  constructor({ salt }) {
    this.#salt = salt;
  }

  async compare(plaintext, hash) {
    return await bcrypt.compare(plaintext, hash);
  }

  async hash(plaintext) {
    return await bcrypt.hash(plaintext, this.#salt);
  }
}
