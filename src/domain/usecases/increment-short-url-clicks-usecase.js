export default class IncrementShortUrlClicksUsecase {
  #incrementShortUrlClicksRepository;

  constructor({ incrementShortUrlClicksRepository }) {
    this.#incrementShortUrlClicksRepository = incrementShortUrlClicksRepository;
  }

  async handle(shortCode) {
    await this.#incrementShortUrlClicksRepository.incrementClicks(shortCode);
  }
}
