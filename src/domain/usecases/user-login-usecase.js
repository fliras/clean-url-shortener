import UserNotFoundError from '../errors/user-not-found-error.js';

export default class UserLoginUsecase {
  #loadUserByUsernameRepository;

  constructor({ loadUserByUsernameRepository }) {
    this.#loadUserByUsernameRepository = loadUserByUsernameRepository;
  }

  async handle({ username }) {
    const user =
      await this.#loadUserByUsernameRepository.loadByUsername(username);
    if (!user) return new UserNotFoundError();
  }
}
