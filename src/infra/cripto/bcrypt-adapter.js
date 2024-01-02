import bcrypt from 'bcrypt';

export default class BcryptAdapter {
  async compare(plaintext, hash) {
    await bcrypt.compare(plaintext, hash);
  }
}
