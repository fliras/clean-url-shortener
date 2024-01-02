import UserNotFoundError from '../errors/user-not-found-error.js';
import InvalidLoginError from '../errors/invalid-login-error.js';

export default class UserLoginUsecase {
  #loadUserByUsernameRepository;
  #hashComparer;
  #encrypter;

  constructor({ loadUserByUsernameRepository, hashComparer, encrypter }) {
    this.#loadUserByUsernameRepository = loadUserByUsernameRepository;
    this.#hashComparer = hashComparer;
    this.#encrypter = encrypter;
  }

  async handle({ username, password }) {
    const user =
      await this.#loadUserByUsernameRepository.loadByUsername(username);
    if (!user) return new UserNotFoundError();
    const isPasswordValid = await this.#hashComparer.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) return new InvalidLoginError();
    await this.#encrypter.encrypt({ userId: user.userId });
  }
}
