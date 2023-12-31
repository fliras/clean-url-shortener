import jwt from 'jsonwebtoken';
import JwtAdapter from '@/infra/cripto/jwt-adapter.js';

jest.mock('jsonwebtoken', () => ({
  async verify() {
    return 'payload';
  },
}));

const makeSut = () => {
  const secret = 'jwt-secret';
  const sut = new JwtAdapter({ secret });
  return {
    secret,
    sut,
  };
};

describe('JwtAdapter', () => {
  describe('verify()', () => {
    it('Should call jwt.verify with correct values', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify');
      const { secret, sut } = makeSut();
      const token = 'token';
      await sut.verify(token);
      expect(verifySpy).toHaveBeenCalledWith(token, secret);
    });
  });
});
