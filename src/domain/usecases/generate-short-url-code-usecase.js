export default class GenerateShortUrlCodeUsecase {
  #shortCodeLength;
  #CHARACTERS =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  constructor({ shortCodeLength }) {
    this.#shortCodeLength = shortCodeLength;
  }

  #getRandomChar() {
    const dictionaryLength = this.#CHARACTERS.length;
    const randomIndex = Math.floor(Math.random() * dictionaryLength);
    return this.#CHARACTERS[randomIndex];
  }

  async handle() {
    let shortCode = '';
    for (let i = 0; i < this.#shortCodeLength; i++) {
      shortCode += this.#getRandomChar();
    }
    return shortCode;
  }
}
