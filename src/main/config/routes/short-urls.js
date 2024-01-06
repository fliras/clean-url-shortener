import authentication from '../../middlewares/authentication.js';
import adaptRoute from '../../adapters/express-route-adapter.js';
import makeAddShortUrlController from '../../factories/presentation/controllers/add-short-url-controller.js';
import makeAccessShortUrlController from '../../factories/presentation/controllers/access-short-url-controller.js';

export default (router) => {
  router.post(
    '/short-urls',
    authentication,
    adaptRoute(makeAddShortUrlController()),
  );

  router.get('/:shortCode', adaptRoute(makeAccessShortUrlController()));
};
