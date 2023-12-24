export default class UniqueCodeGenerator {
  #CHARACTERS =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  #getRandomChar() {
    const dictionaryLength = this.#CHARACTERS.length;
    const randomIndex = Math.floor(Math.random() * dictionaryLength);
    return this.#CHARACTERS.charAt(randomIndex);
  }

  generate(codeLength) {
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += this.#getRandomChar();
    }
    return code;
  }
}
