export default class ExpiredShortUrlError extends Error {
  constructor() {
    super('This short url is expired');
    this.name = 'ExpiredShortUrlError';
  }
}
