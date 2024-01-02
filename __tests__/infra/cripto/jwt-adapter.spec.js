import jwt from 'jsonwebtoken';
import JwtAdapter from '@/infra/cripto/jwt-adapter.js';
import { mockThrow } from '@/tests/helpers.js';

const MOCKED_PAYLOAD = 'payload';
const MOCKED_TOKEN = 'any-token';

jest.mock('jsonwebtoken', () => ({
  async verify() {
    return MOCKED_PAYLOAD;
  },

  async sign() {
    return MOCKED_TOKEN;
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
      await sut.decrypt(MOCKED_TOKEN);
      expect(decryptSpy).toHaveBeenCalledWith(MOCKED_TOKEN, secret);
    });

    it('Should throw if jwt.verify throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(mockThrow);
      const output = sut.decrypt();
      expect(output).rejects.toThrow();
    });

    it('Should return a payload on success', async () => {
      const { sut } = makeSut();
      const output = await sut.decrypt(MOCKED_TOKEN);
      expect(output).toBe(MOCKED_PAYLOAD);
    });
  });

  describe('encrypt()', () => {
    it('Should call jwt.sign with the correct values', async () => {
      const { secret, sut } = makeSut();
      const jwtSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt(MOCKED_PAYLOAD);
      expect(jwtSpy).toHaveBeenCalledWith(MOCKED_PAYLOAD, secret);
    });

    it('Should throw if jwt.sign throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(mockThrow);
      const output = sut.encrypt(MOCKED_PAYLOAD);
      expect(output).rejects.toThrow();
    });

    it('Should return a token on success', async () => {
      const { sut } = makeSut();
      const output = await sut.encrypt(MOCKED_PAYLOAD);
      expect(output).toBe(MOCKED_TOKEN);
    });
  });
});
