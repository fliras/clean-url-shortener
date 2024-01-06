export default class ShortUrlNotFoundError extends Error {
  constructor() {
    super('Short url not found');
    this.name = 'ShortUrlNotFoundError';
  }
}
