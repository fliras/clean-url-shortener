import bcrypt from 'bcrypt';
import BcryptAdapter from '@/infra/cripto/bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async compare() {
    return true;
  },
}));

describe('BcryptAdapter', () => {
  it('Should call bcrypt.compare with correct values', async () => {
    const sut = new BcryptAdapter();
    const bcryptSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('plain-text', 'hash');
    expect(bcryptSpy).toHaveBeenCalledWith('plain-text', 'hash');
  });
});
