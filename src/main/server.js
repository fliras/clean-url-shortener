import db from '../infra/database/postgresql/db.js';
import setupApp from './config/app.js';

const API_PORT = process.env.API_PORT || 3000;

db.raw('SELECT 1 + 1')
  .then(() => {
    const app = setupApp();
    app.listen(API_PORT, () =>
      console.log(`Server listening at *:${API_PORT}`),
    );
  })
  .catch((err) => console.log(err));
