import BcryptAdapter from '../../../../infra/cripto/bcrypt-adapter.js';

const makeBcryptAdapter = () => {
  const salt = 10;
  const bcryptAdapter = new BcryptAdapter({ salt });
  return bcryptAdapter;
};

export default makeBcryptAdapter;
