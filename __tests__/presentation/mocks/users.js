class LoadUserByTokenUsecaseStub {
  user = { userId: 1 };

  async handle() {
    return this.user;
  }
}

export { LoadUserByTokenUsecaseStub };
