export default class UsernameAlreadyInUseError extends Error {
  constructor() {
    super('Username already in use');
    this.name = 'UsernameAlreadyInUseError';
  }
}
