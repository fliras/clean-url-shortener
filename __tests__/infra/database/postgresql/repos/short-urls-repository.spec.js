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
  fullUrl: 'https://www.google.com',
  expirationDate: new Date(),
  userId: userId,
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
      expect(shortUrl).toBeTruthy();
      expect(shortUrl.short_url_id).toBeTruthy();
      expect(shortUrl.short_code).toBe(addParams.shortCode);
      expect(shortUrl.full_url).toBe(addParams.fullUrl);
      expect(shortUrl.clicks).toBeDefined();
      expect(shortUrl.expiration_date).toEqual(addParams.expirationDate);
      expect(shortUrl.created_at).toBeTruthy();
      expect(shortUrl.user_id).toBe(addParams.userId);
    });
  });
});
