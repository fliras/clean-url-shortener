import { Router } from 'express';
import setupShortUrls from './short-urls.js';
import setupUsers from './users.js';

export default (app) => {
  const router = Router();
  setupShortUrls(router);
  setupUsers(router);
  app.use('/api', router);
};
