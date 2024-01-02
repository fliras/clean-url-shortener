import UserLoginController from '../../../../presentation/controllers/user-login-controller.js';
import makeUserLoginUsecase from '../../domain/usecases/user-login-usecase.js';

const makeUserLoginController = () => {
  const userLoginUsecase = makeUserLoginUsecase();
  return new UserLoginController({ userLoginUsecase });
};

export default makeUserLoginController;
