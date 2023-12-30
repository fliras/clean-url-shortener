import InvalidTokenError from '../errors/invalid-token-error.js';
import UserNotFoundError from '../errors/user-not-found-error.js';

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
    const loadedUser = await this.#loadUserByIdRepository.loadById(
      tokenPayload.userId,
    );
    if (!loadedUser) return new UserNotFoundError();
    return this.#map(loadedUser);
  }

  #map(user) {
    return {
      userId: user.user_id,
      username: user.username,
      createdAt: user.created_at,
      password: undefined,
    };
  }
}
