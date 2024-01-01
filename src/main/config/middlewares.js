import bodyParser from '../middlewares/body-parser.js';

export default (app) => {
  app.use(bodyParser);
};
