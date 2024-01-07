import bcrypt from 'bcrypt';
import BcryptAdapter from '@/infra/cripto/bcrypt-adapter';
import { mockThrow } from '@/tests/helpers.js';

jest.mock('bcrypt', () => ({
  async compare() {
    return true;
  },

  async hash() {
    return 'any-hash';
  },
}));

const makeSut = () => {
  const salt = 10;
  const sut = new BcryptAdapter({ salt });
  return {
    salt,
    sut,
  };
};

describe('BcryptAdapter', () => {
  describe('compare()', () => {
    const input = ['plain-text', 'hash'];

    it('Should call bcrypt.compare with correct values', async () => {
      const { sut } = makeSut();
      const bcryptSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare(...input);
      expect(bcryptSpy).toHaveBeenCalledWith('plain-text', 'hash');
    });

    it('Should throw if bcrypt.compare throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(mockThrow);
      const output = sut.compare(...input);
      expect(output).rejects.toThrow();
    });

    describe('Should return a boolean on success', () => {
      it('when bcrypt.compare returns false', async () => {
        const { sut } = makeSut();
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
        const output = await sut.compare(...input);
        expect(output).toBe(false);
      });

      it('when bcrypt.compare returns true', async () => {
        const { sut } = makeSut();
        const output = await sut.compare(...input);
        expect(output).toBe(true);
      });
    });
  });

  describe('hash()', () => {
    it('Should call bcrypt.hash with the correct values', async () => {
      const { salt, sut } = makeSut();
      const bcryptSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any-text');
      expect(bcryptSpy).toHaveBeenCalledWith('any-text', salt);
    });

    it('Should throw if bcrypt.hash throws', async () => {
      const { salt, sut } = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(mockThrow);
      const output = sut.hash('any-text', salt);
      expect(output).rejects.toThrow();
    });
  });
});
