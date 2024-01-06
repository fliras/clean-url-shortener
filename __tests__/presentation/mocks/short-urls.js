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
  async handle() {}
}

export {
  GenerateShortUrlCodeUsecaseStub,
  AddShortUrlUsecaseStub,
  LoadShortUrlByCodeUsecaseStub,
};
