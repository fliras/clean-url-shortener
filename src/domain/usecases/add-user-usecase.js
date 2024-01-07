import UsernameAlreadyInUseError from '../errors/username-already-in-use-error.js';

export default class AddUserUsecase {
  #checkUserByUsernameRepository;
  #hasher;
  #addUserRepository;

  constructor({ checkUserByUsernameRepository, hasher, addUserRepository }) {
    this.#checkUserByUsernameRepository = checkUserByUsernameRepository;
    this.#hasher = hasher;
    this.#addUserRepository = addUserRepository;
  }

  async handle({ username, password }) {
    const usernameAlreadyInUse =
      await this.#checkUserByUsernameRepository.checkByUsername(username);
    if (usernameAlreadyInUse) return new UsernameAlreadyInUseError();
    const hashedPassword = await this.#hasher.hash(password);
    const newUser = await this.#addUserRepository.add({
      username,
      password: hashedPassword,
    });
    delete newUser.password;
    return newUser;
  }
}
