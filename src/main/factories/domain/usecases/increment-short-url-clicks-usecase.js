import IncrementShortUrlClicksUsecase from '../../../../domain/usecases/increment-short-url-clicks-usecase.js';
import makeShortUrlsRepository from '../../infra/database/postgresql/repos/short-urls-repository.js';

const makeIncrementShortUrlClicksUsecase = () => {
  return new IncrementShortUrlClicksUsecase({
    incrementShortUrlClicksRepository: makeShortUrlsRepository(),
  });
};

export default makeIncrementShortUrlClicksUsecase;
