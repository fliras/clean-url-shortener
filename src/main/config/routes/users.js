import adaptRoute from '../../adapters/express-route-adapter.js';
import makeUserLoginController from '../../factories/presentation/controllers/user-login-controller.js';

export default (router) => {
  router.post('/users/login', adaptRoute(makeUserLoginController()));
};
