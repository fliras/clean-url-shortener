import TimestampOperations from '@/infra/timestamp/timestamp-operations.js';

const DAYS_TO_ADD = 5;
const GIVEN_TIMESTAMP = new Date('2001-01-13');
const GIVEN_TIMESTAMP_ADDED = new Date('2001-01-18');
const MOCKED_SYSTEM_TIMESTAMP = new Date('2001-01-01');
const MOCKED_SYSTEM_TIMESTAMP_ADDED = new Date('2001-01-06');

const makeSut = () => ({
  sut: new TimestampOperations(),
});

describe('TimestampOperations', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(MOCKED_SYSTEM_TIMESTAMP);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('addDays()', () => {
    it('Should return a Date object', () => {
      const { sut } = makeSut();
      const output = sut.addDays(DAYS_TO_ADD);
      expect(output).toBeInstanceOf(Date);
    });

    describe('Should return a timestamp added to the provided number of days', () => {
      it('without a given timestamp', () => {
        const { sut } = makeSut();
        const output = sut.addDays(DAYS_TO_ADD);
        expect(output).toEqual(MOCKED_SYSTEM_TIMESTAMP_ADDED);
      });

      it('with a given timestamp', () => {
        const { sut } = makeSut();
        const output = sut.addDays(DAYS_TO_ADD, GIVEN_TIMESTAMP);
        expect(output).toEqual(GIVEN_TIMESTAMP_ADDED);
      });
    });
  });
});
