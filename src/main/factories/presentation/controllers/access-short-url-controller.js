import AccessShortUrlController from '../../../../presentation/controllers/access-short-url-controller.js';
import makeObtainUrlFromAValidShortUrlUsecase from '../../domain/usecases/obtain-url-from-a-valid-short-url-usecase.js';
import makeIncrementShortUrlClicksUsecase from '../../domain/usecases/increment-short-url-clicks-usecase.js';

const makeAccessShortUrlController = () => {
  return new AccessShortUrlController({
    obtainUrlFromAValidShortUrlUsecase:
      makeObtainUrlFromAValidShortUrlUsecase(),
    incrementShortUrlClicksUsecase: makeIncrementShortUrlClicksUsecase(),
  });
};

export default makeAccessShortUrlController;
