class GenerateShortUrlCodeUsecaseStub {
  async handle() {
    return 'random-short-code';
  }
}

class AddShortUrlUsecaseStub {
  result = {
    id: 1,
    shortCode: 'short-code',
    fullUrl: 'full-url',
    clicks: 0,
    expirationDate: new Date(),
    createdAt: new Date(),
    userId: 1,
  };

  async handle() {
    return this.result;
  }
}

class LoadShortUrlByCodeUsecaseStub {
  result = {
    shortUrlId: 1,
    shortCode: 'any-code',
    fullUrl: 'any-url',
    clicks: 0,
    expirationDate: new Date(),
    createdAt: new Date(),
    userId: 1,
  };

  async handle() {
    return this.result;
  }
}

class IncrementShortUrlClicksUsecaseStub {
  async handle() {}
}

export {
  GenerateShortUrlCodeUsecaseStub,
  AddShortUrlUsecaseStub,
  LoadShortUrlByCodeUsecaseStub,
  IncrementShortUrlClicksUsecaseStub,
};
