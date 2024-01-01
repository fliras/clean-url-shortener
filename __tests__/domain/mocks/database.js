class CheckShortUrlByCodeRepositoryStub {
  async checkByCode() {
    return false;
  }
}

class AddShortUrlRepositoryStub {
  createdShortUrl = {
    id: 1,
    fullUrl: 'full-url',
    shortCode: 'short-code',
    expirationDate: new Date('2021-01-15'),
  };

  async add() {
    return this.createdShortUrl;
  }
}

class LoadUserByIdRepositoryStub {
  result = {
    userId: 1,
    username: 'user01',
    password: 'hashed-password',
    createdAt: new Date(),
  };

  async loadById() {
    return this.result;
  }
}

export {
  CheckShortUrlByCodeRepositoryStub,
  AddShortUrlRepositoryStub,
  LoadUserByIdRepositoryStub,
};
