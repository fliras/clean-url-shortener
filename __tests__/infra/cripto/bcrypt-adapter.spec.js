import bcrypt from 'bcrypt';
import BcryptAdapter from '@/infra/cripto/bcrypt-adapter';
import { mockThrow } from '@/tests/helpers.js';

jest.mock('bcrypt', () => ({
  async compare() {
    return true;
  },
}));

const input = ['plain-text', 'hash'];

describe('BcryptAdapter', () => {
  it('Should call bcrypt.compare with correct values', async () => {
    const sut = new BcryptAdapter();
    const bcryptSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare(...input);
    expect(bcryptSpy).toHaveBeenCalledWith('plain-text', 'hash');
  });

  it('Should throw if bcrypt.compare throws', async () => {
    const sut = new BcryptAdapter();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(mockThrow);
    const output = sut.compare(...input);
    expect(output).rejects.toThrow();
  });

  describe('Should return a boolean on success', () => {
    it('when bcrypt.compare returns false', async () => {
      const sut = new BcryptAdapter();
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
      const output = await sut.compare(...input);
      expect(output).toBe(false);
    });

    it('when bcrypt.compare returns true', async () => {
      const sut = new BcryptAdapter();
      const output = await sut.compare(...input);
      expect(output).toBe(true);
    });
  });
});
