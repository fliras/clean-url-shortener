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

class AddUserUsecaseStub {
  result = {
    userId: 1,
    username: 'any-username',
    createdAt: new Date(),
  };

  async handle() {
    return this.result;
  }
}

export { LoadUserByTokenUsecaseStub, UserLoginUsecaseStub, AddUserUsecaseStub };
