import GenerateShortUrlCodeUsecase from '@/domain/usecases/generate-short-url-code-usecase.js';

describe('GenerateShortUrlCodeUsecase', () => {
  test('Should return a shortCode according to the specified length', async () => {
    const shortCodeLength = 13;
    const sut = new GenerateShortUrlCodeUsecase({ shortCodeLength });
    const response = await sut.handle();
    expect(response.length).toBe(shortCodeLength);
  });
});
