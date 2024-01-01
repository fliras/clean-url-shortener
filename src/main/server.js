import db from '../infra/database/postgresql/knexfile.js';
import setupApp from './config/app.js';

db.raw('SELECT 1 + 1')
  .then(() => {
    const app = setupApp();
    app.listen(3000, () => console.log('pokano krl'));
  })
  .catch((err) => console.log(err));
