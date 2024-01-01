import { Router } from 'express';
import setupShortUrls from './short-urls.js';

export default (app) => {
  const router = Router();
  setupShortUrls(router);
  app.use('/api', router);
};
