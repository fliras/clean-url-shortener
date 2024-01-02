import bcrypt from 'bcrypt';

export default class BcryptAdapter {
  async compare(plaintext, hash) {
    return await bcrypt.compare(plaintext, hash);
  }
}
