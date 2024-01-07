import UsernameAlreadyInUseError from '../errors/username-already-in-use-error.js';

export default class AddUserUsecase {
  #checkUserByUsernameRepository;

  constructor({ checkUserByUsernameRepository }) {
    this.#checkUserByUsernameRepository = checkUserByUsernameRepository;
  }

  async handle({ username, password }) {
    const usernameAlreadyInuse =
      await this.#checkUserByUsernameRepository.checkByUsername(username);
    if (usernameAlreadyInuse) return new UsernameAlreadyInUseError();
  }
}
