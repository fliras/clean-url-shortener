import TimestampOperations from '@/infra/timestamp/timestamp-operations.js';

const makeSut = () => {
  const daysToAdd = 5;
  const sut = new TimestampOperations();
  return {
    daysToAdd,
    sut,
  };
};

describe('TimestampOperations', () => {
  beforeEach(() => {
    const mockedTimestamp = new Date('2001-01-01');
    jest.useFakeTimers('modern');
    jest.setSystemTime(mockedTimestamp);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('addDays()', () => {
    it('Should return a Date object', () => {
      const { daysToAdd, sut } = makeSut();
      const output = sut.addDays(daysToAdd);
      expect(output).toBeInstanceOf(Date);
    });
  });
});
