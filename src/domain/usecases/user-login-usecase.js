export default class UserLoginUsecase {
  #loadUserByUsernameRepository;

  constructor({ loadUserByUsernameRepository }) {
    this.#loadUserByUsernameRepository = loadUserByUsernameRepository;
  }

  async handle({ username }) {
    await this.#loadUserByUsernameRepository.loadByUsername(username);
  }
}
