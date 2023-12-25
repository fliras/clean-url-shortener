export default class CodeAlreadyInUseError extends Error {
  constructor() {
    super(`Code already in use`);
    this.name = 'CodeAlreadyInUseError';
  }
}
