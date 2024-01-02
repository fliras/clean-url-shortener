import jwt from 'jsonwebtoken';
import JwtAdapter from '@/infra/cripto/jwt-adapter.js';
import { mockThrow } from '@/tests/helpers.js';

jest.mock('jsonwebtoken', () => ({
  async verify() {
    return 'payload';
  },

  async sign() {
    return 'any-token';
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
  describe('decrypt()', () => {
    it('Should call jwt.verify with correct values', async () => {
      const decryptSpy = jest.spyOn(jwt, 'verify');
      const { secret, sut } = makeSut();
      const token = 'token';
      await sut.decrypt(token);
      expect(decryptSpy).toHaveBeenCalledWith(token, secret);
    });

    it('Should throw if jwt.verify throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(mockThrow);
      const output = sut.decrypt();
      expect(output).rejects.toThrow();
    });

    it('Should return a payload on success', async () => {
      const { sut } = makeSut();
      const token = 'token';
      const output = await sut.decrypt(token);
      expect(output).toBe('payload');
    });
  });

  describe('encrypt()', () => {
    it('Should call jwt.sign with the correct values', async () => {
      const { secret, sut } = makeSut();
      const jwtSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('payload');
      expect(jwtSpy).toHaveBeenCalledWith('payload', secret);
    });
  });
});
