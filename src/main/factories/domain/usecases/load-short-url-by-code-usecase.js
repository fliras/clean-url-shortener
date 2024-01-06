import LoadShortUrlByCodeUsecase from '../../../../domain/usecases/load-short-url-by-code-usecase.js';
import makeShortUrlsRepository from '../../infra/database/postgresql/repos/short-urls-repository.js';

const makeLoadShortUrlByCodeUsecase = () => {
  return new LoadShortUrlByCodeUsecase({
    loadShortUrlByCodeRepository: makeShortUrlsRepository(),
  });
};

export default makeLoadShortUrlByCodeUsecase;
