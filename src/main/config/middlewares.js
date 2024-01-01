import authentication from '../middlewares/authentication.js';
import bodyParser from '../middlewares/body-parser.js';

export default (app) => {
  app.use(bodyParser);
  app.use(authentication);
};
