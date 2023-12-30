import InvalidTokenError from '../errors/invalid-token-error';

export default class LoadUserByTokenUsecase {
  #loadUserByIdRepository;
  #decrypter;

  constructor({ decrypter }) {
    this.#decrypter = decrypter;
  }

  async handle(token) {
    const tokenPayload = await this.#decrypter.decrypt(token);
    if (!tokenPayload) return new InvalidTokenError();
  }
}
