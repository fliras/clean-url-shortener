import LoadUserByTokenUsecase from '@/domain/usecases/load-user-by-token-usecase.js';
import InvalidTokenError from '@/domain/errors/invalid-token-error';

class DecrypterStub {
  async decrypt() {
    return {
      userId: 1,
    };
  }
}

const makeSut = () => {
  const decrypter = new DecrypterStub();
  const sut = new LoadUserByTokenUsecase({ decrypter });
  return {
    decrypter,
    sut,
  };
};

describe('LoadUserByTokenUsecase', () => {
  it('Should call decrypter with correct values', async () => {
    const { decrypter, sut } = makeSut();
    const decrypterSpy = jest.spyOn(decrypter, 'decrypt');
    await sut.handle('access-token');
    expect(decrypterSpy).toHaveBeenCalledWith('access-token');
  });

  it('Should return InvalidTokenError if decrypter returns false', async () => {
    const { decrypter, sut } = makeSut();
    jest.spyOn(decrypter, 'decrypt').mockResolvedValueOnce(false);
    const output = await sut.handle('access-token');
    expect(output).toEqual(new InvalidTokenError());
  });
});
