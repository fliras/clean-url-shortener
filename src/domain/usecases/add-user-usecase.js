export default class AddUserUsecase {
  #checkUserByUsernameRepository;

  constructor({ checkUserByUsernameRepository }) {
    this.#checkUserByUsernameRepository = checkUserByUsernameRepository;
  }

  async handle({ username, password }) {
    await this.#checkUserByUsernameRepository.checkByUsername(username);
  }
}
