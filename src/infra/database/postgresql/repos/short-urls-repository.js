import db from '../db.js';

export default class ShortUrlsRepository {
  async add(data) {
    const [shortUrl] = await db('short_urls')
      .insert({
        short_code: data.shortCode,
        full_url: data.url,
        expiration_date: data.expirationDate,
        user_id: data.userId,
      })
      .returning('*');
    return this.#map(shortUrl);
  }

  async checkByCode(code) {
    const shortUrl = await this.loadByCode(code);
    return shortUrl !== undefined;
  }

  async loadByCode(code) {
    const shortUrl = await db('short_urls').first().where({ short_code: code });
    return shortUrl && this.#map(shortUrl);
  }

  async incrementClicks(code) {
    await db('short_urls').increment('clicks', 1).where({ short_code: code });
  }

  #map(shortUrl) {
    return {
      shortUrlId: shortUrl.short_url_id,
      shortCode: shortUrl.short_code,
      fullUrl: shortUrl.full_url,
      clicks: shortUrl.clicks,
      expirationDate: shortUrl.expiration_date,
      createdAt: shortUrl.created_at,
      userId: shortUrl.user_id,
    };
  }
}
