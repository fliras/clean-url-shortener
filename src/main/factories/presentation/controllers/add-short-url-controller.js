import AddShortUrlController from '../../../../presentation/controllers/add-short-url-controller.js';
import makeGenerateShortUrlCodeUsecase from '../../domain/usecases/generate-short-url-code-usecase.js';
import makeAddShortUrlUsecase from '../../domain/usecases/add-short-url-usecase.js';

const makeAddShortUrlController = () => {
  const generateShortUrlCodeUsecase = makeGenerateShortUrlCodeUsecase();
  const addShortUrlUsecase = makeAddShortUrlUsecase();
  return new AddShortUrlController({
    generateShortUrlCodeUsecase,
    addShortUrlUsecase,
  });
};

export default makeAddShortUrlController;
