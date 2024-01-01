import db from '@/infra/database/postgresql/knexfile.js';
import ShortUrlsRepository from '@/infra/database/postgresql/repos/short-urls-repository.js';

const makeSut = () => {
  const sut = new ShortUrlsRepository();
  return {
    sut,
  };
};

const mockUserId = async () => {
  const [user] = await db('users')
    .insert({
      username: 'user01',
      password: 'password-hash',
    })
    .returning('user_id');
  return user.user_id;
};

const mockAddParams = (userId) => ({
  shortCode: 'short-code',
  url: 'https://www.google.com',
  expirationDate: new Date(),
  userId,
});

describe('ShortUrlsRepository', () => {
  beforeEach(async () => {
    await db('short_urls').del();
    await db('users').del();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('add()', () => {
    it('Should return a short_url on success', async () => {
      const { sut } = makeSut();
      const userId = await mockUserId();
      const addParams = mockAddParams(userId);
      const shortUrl = await sut.add(addParams);
      expect(shortUrl?.shortUrlId).toBeTruthy();
      expect(shortUrl).toMatchObject({
        shortCode: addParams.shortCode,
        fullUrl: addParams.url,
        expirationDate: addParams.expirationDate,
        userId,
        clicks: 0,
      });
    });
  });

  describe('checkByCode', () => {
    it('Should return true if short url exists', async () => {
      const { sut } = makeSut();
      const userId = await mockUserId();
      const addParams = mockAddParams(userId);
      const shortUrl = await sut.add(addParams);
      const shortUrlExists = await sut.checkByCode(shortUrl.shortCode);
      expect(shortUrlExists).toBe(true);
    });

    it("Should return false if short url doesn't exists", async () => {
      const { sut } = makeSut();
      const shortUrlExists = await sut.checkByCode('random-short-code');
      expect(shortUrlExists).toBe(false);
    });
  });
});
