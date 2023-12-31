import JwtAdapter from '../../../../infra/cripto/jwt-adapter.js';

const makeJwtAdapter = () => {
  const secret = process.env.JWT_SECRET;
  const jwtAdapter = new JwtAdapter({ secret });
  return jwtAdapter;
};

export default makeJwtAdapter;
