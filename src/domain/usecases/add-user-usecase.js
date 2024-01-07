import UsernameAlreadyInUseError from '../errors/username-already-in-use-error.js';

export default class AddUserUsecase {
  #checkUserByUsernameRepository;
  #hasher;

  constructor({ checkUserByUsernameRepository, hasher }) {
    this.#checkUserByUsernameRepository = checkUserByUsernameRepository;
    this.#hasher = hasher;
  }

  async handle({ username, password }) {
    const usernameAlreadyInuse =
      await this.#checkUserByUsernameRepository.checkByUsername(username);
    if (usernameAlreadyInuse) return new UsernameAlreadyInUseError();
    await this.#hasher.hash(password);
  }
}
