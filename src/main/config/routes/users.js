import adaptRoute from '../../adapters/express-route-adapter.js';
import makeUserLoginController from '../../factories/presentation/controllers/user-login-controller.js';
import makeAddUserController from '../../factories/presentation/controllers/add-user-controller.js';

export default (router) => {
  router.post('/users/login', adaptRoute(makeUserLoginController()));
  router.post('/users', adaptRoute(makeAddUserController()));
};
