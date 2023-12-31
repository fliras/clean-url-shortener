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

const mockThrow = () => {
  throw new Error();
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
});
