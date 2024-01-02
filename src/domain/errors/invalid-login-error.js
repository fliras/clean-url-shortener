export default class InvalidLoginError extends Error {
  constructor() {
    super('Invalid login');
    this.name = 'InvalidLoginError';
  }
}
