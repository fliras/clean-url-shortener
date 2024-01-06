import AccessShortUrlController from '../../../../presentation/controllers/access-short-url-controller.js';
import makeLoadShortUrlByCodeUsecase from '../../domain/usecases/load-short-url-by-code-usecase.js';
import makeIncrementShortUrlClicksUsecase from '../../domain/usecases/increment-short-url-clicks-usecase.js';

const makeAccessShortUrlController = () => {
  return new AccessShortUrlController({
    loadShortUrlByCodeUsecase: makeLoadShortUrlByCodeUsecase(),
    incrementShortUrlClicksUsecase: makeIncrementShortUrlClicksUsecase(),
  });
};

export default makeAccessShortUrlController;
