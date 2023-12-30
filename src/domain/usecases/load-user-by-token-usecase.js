import InvalidTokenError from '../errors/invalid-token-error';

export default class LoadUserByTokenUsecase {
  #loadUserByIdRepository;
  #decrypter;

  constructor({ decrypter, loadUserByIdRepository }) {
    this.#decrypter = decrypter;
    this.#loadUserByIdRepository = loadUserByIdRepository;
  }

  async handle(token) {
    const tokenPayload = await this.#decrypter.decrypt(token);
    if (!tokenPayload) return new InvalidTokenError();
    await this.#loadUserByIdRepository.handle(tokenPayload.userId);
  }
}
