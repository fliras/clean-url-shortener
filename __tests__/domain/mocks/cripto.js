class UniqueCodeGeneratorStub {
  code = 'random-code';
  generate() {
    return this.code;
  }
}

class DecrypterStub {
  result = { userId: 1 };

  async decrypt() {
    return this.result;
  }
}

class HashComparerStub {
  async compare() {
    return true;
  }
}

class EncrypterStub {
  result = 'any-token';
  async encrypt() {
    return this.result;
  }
}

export {
  UniqueCodeGeneratorStub,
  DecrypterStub,
  HashComparerStub,
  EncrypterStub,
};
