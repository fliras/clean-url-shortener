import express from 'express';
import setupMiddlewares from './middlewares.js';
import setupRoutes from './routes/index.js';

export default () => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
