export default class InvalidLoginError extends Error {
  constructor() {
    super('Invalid Login');
    this.name = 'InvalidLoginError';
  }
}
