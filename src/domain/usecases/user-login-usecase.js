import UserNotFoundError from '../errors/user-not-found-error.js';

export default class UserLoginUsecase {
  #loadUserByUsernameRepository;
  #hashComparer;

  constructor({ loadUserByUsernameRepository, hashComparer }) {
    this.#loadUserByUsernameRepository = loadUserByUsernameRepository;
    this.#hashComparer = hashComparer;
  }

  async handle({ username, password }) {
    const user =
      await this.#loadUserByUsernameRepository.loadByUsername(username);
    if (!user) return new UserNotFoundError();
    await this.#hashComparer.compare(password, user.password);
  }
}
