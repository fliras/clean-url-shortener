import AddShortUrlUsecase from '@/domain/usecases/add-short-url-usecase.js';
import CodeAlreadyInUseError from '@/domain/errors/code-already-in-use-error.js';
import { mockThrow } from '@/tests/helpers.js';
import {
  CheckShortUrlByCodeRepositoryStub,
  AddShortUrlRepositoryStub,
} from '@/tests/domain/mocks/database.js';
import { TimestampAdderStub } from '@/tests/domain/mocks/timestamp.js';

const mockRequest = () => ({
  userId: 1,
  url: 'full-url',
  shortCode: 'short-code',
  validityInDays: 5,
});

const makeSut = () => {
  const checkShortUrlByCodeRepository = new CheckShortUrlByCodeRepositoryStub();
  const timestampAdder = new TimestampAdderStub();
  const addShortUrlRepository = new AddShortUrlRepositoryStub();
  const sut = new AddShortUrlUsecase({
    checkShortUrlByCodeRepository,
    timestampAdder,
    addShortUrlRepository,
  });
  return {
    checkShortUrlByCodeRepository,
    timestampAdder,
    addShortUrlRepository,
    sut,
  };
};

describe('AddShortUrlUsecase', () => {
  it('Should call checkShortUrlByCodeRepository with correct values', async () => {
    const { checkShortUrlByCodeRepository, sut } = makeSut();
    const checkShortUrlSpy = jest.spyOn(
      checkShortUrlByCodeRepository,
      'checkByCode',
    );
    await sut.handle(mockRequest());
    expect(checkShortUrlSpy).toHaveBeenCalledWith('short-code');
  });

  it('Should return CodeAlreadyInUseError if CheckShortUrlByCodeRepository returns true', async () => {
    const { checkShortUrlByCodeRepository, sut } = makeSut();
    jest
      .spyOn(checkShortUrlByCodeRepository, 'checkByCode')
      .mockResolvedValueOnce(true);
    const output = sut.handle(mockRequest());
    expect(output).resolves.toEqual(new CodeAlreadyInUseError());
  });

  it('Should throw if CheckShortUrlByCodeRepository throws', async () => {
    const { checkShortUrlByCodeRepository, sut } = makeSut();
    jest
      .spyOn(checkShortUrlByCodeRepository, 'checkByCode')
      .mockImplementationOnce(mockThrow);
    const output = sut.handle(mockRequest());
    expect(output).rejects.toThrow();
  });

  it('Should call TimestampAdder with correct values if validityInDays is provided', async () => {
    const { timestampAdder, sut } = makeSut();
    const timestampAdderSpy = jest.spyOn(timestampAdder, 'addDays');
    const request = mockRequest();
    await sut.handle(request);
    expect(timestampAdderSpy).toHaveBeenCalledWith(request.validityInDays);
  });

  it('Should throw if TimestampAdder throws', async () => {
    const { timestampAdder, sut } = makeSut();
    jest.spyOn(timestampAdder, 'addDays').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockRequest());
    expect(output).rejects.toThrow();
  });

  it('Should call AddShortUrlRepository with correct values (when validityInDays is provided)', async () => {
    const { addShortUrlRepository, timestampAdder, sut } = makeSut();
    const addShortUrlSpy = jest.spyOn(addShortUrlRepository, 'add');
    const request = mockRequest();
    await sut.handle(request);
    expect(addShortUrlSpy).toHaveBeenCalledWith({
      ...request,
      validityInDays: undefined,
      expirationDate: timestampAdder.addedTimestamp,
    });
  });

  it('Should call AddShortUrlRepository with correct values (when validityInDays is not provided)', async () => {
    const { addShortUrlRepository, sut } = makeSut();
    const addShortUrlSpy = jest.spyOn(addShortUrlRepository, 'add');
    const request = { ...mockRequest(), validityInDays: undefined };
    await sut.handle(request);
    expect(addShortUrlSpy).toHaveBeenCalledWith({
      ...request,
      validityInDays: undefined,
      expirationDate: undefined,
    });
  });

  it('Should throw if AddShortUrlRepository throws', async () => {
    const { addShortUrlRepository, sut } = makeSut();
    jest.spyOn(addShortUrlRepository, 'add').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockRequest());
    expect(output).rejects.toThrow();
  });

  it('Should return the created ShortUrl on success', async () => {
    const { addShortUrlRepository, sut } = makeSut();
    const request = mockRequest();
    const output = await sut.handle(request);
    expect(output).toBe(addShortUrlRepository.createdShortUrl);
  });
});
