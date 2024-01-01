class TimestampAdderStub {
  addedTimestamp = new Date('2001-01-15');

  addDays() {
    return this.addedTimestamp;
  }
}

export { TimestampAdderStub };
