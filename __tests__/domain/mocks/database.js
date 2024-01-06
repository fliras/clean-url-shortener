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

class LoadUserByUsernameRepositoryStub {
  result = {
    userId: 1,
    username: 'user01',
    password: 'hashed-password',
    createdAt: new Date(),
  };

  async loadByUsername() {
    return this.result;
  }
}

class LoadShortUrlByCodeRepositoryStub {
  result = {
    shortUrlId: 1,
    shortCode: 'any-code',
    fullUrl: 'any-url',
    Clicks: 0,
    expirationDate: new Date(),
    createdAt: new Date(),
    userId: 1,
  };

  async loadByCode() {
    return this.result;
  }
}

export {
  CheckShortUrlByCodeRepositoryStub,
  AddShortUrlRepositoryStub,
  LoadUserByIdRepositoryStub,
  LoadUserByUsernameRepositoryStub,
  LoadShortUrlByCodeRepositoryStub,
};
