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

export { UniqueCodeGeneratorStub, DecrypterStub, HashComparerStub };
