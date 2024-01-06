import ObtainUrlFromAValidShortUrlUsecase from '../../../../domain/usecases/obtain-url-from-a-valid-short-url-usecase.js';
import makeShortUrlsRepository from '../../infra/database/postgresql/repos/short-urls-repository.js';

const makeObtainUrlFromAValidShortUrlUsecase = () => {
  return new ObtainUrlFromAValidShortUrlUsecase({
    loadShortUrlByCodeRepository: makeShortUrlsRepository(),
  });
};

export default makeObtainUrlFromAValidShortUrlUsecase;
