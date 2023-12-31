import AuthenticationMiddleware from '../../../../presentation/middlewares/authentication-middleware.js';
import makeLoadUserByTokenUsecase from '../../domain/usecases/load-user-by-token-usecase.js';

const makeAuthenticationMiddleware = () => {
  const loadUserByTokenUsecase = makeLoadUserByTokenUsecase();
  return new AuthenticationMiddleware({ loadUserByTokenUsecase });
};

export default makeAuthenticationMiddleware;
