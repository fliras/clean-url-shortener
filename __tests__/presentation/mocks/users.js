class LoadUserByTokenUsecaseStub {
  user = { userId: 1 };

  async handle() {
    return this.user;
  }
}

class UserLoginUsecaseStub {
  token = 'any-token';

  async handle() {
    return this.token;
  }
}

export { LoadUserByTokenUsecaseStub, UserLoginUsecaseStub };
