import makeAuthenticationMiddleware from '../factories/presentation/middlewares/authentication-middleware.js';
import adaptMiddleware from '../adapters/express-middleware-adapter.js';

export default adaptMiddleware(makeAuthenticationMiddleware());
