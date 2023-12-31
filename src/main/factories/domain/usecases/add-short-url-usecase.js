import AddShortUrlUsecase from '../../../../domain/usecases/add-short-url-usecase.js';
import makeShortUrlsRepository from '../../infra/database/postgresql/repos/short-urls-repository.js';
import makeTimestampOperations from '../../infra/timestamp/timestamp-operations.js';

const makeAddShortUrlUsecase = () => {
  const shortUrlsRepository = makeShortUrlsRepository();
  const timestampOperations = makeTimestampOperations();
  return new AddShortUrlUsecase({
    checkShortUrlByCodeRepository: shortUrlsRepository,
    timestampAdder: timestampOperations,
    addShortUrlRepository: shortUrlsRepository,
  });
};

export default makeAddShortUrlUsecase;
