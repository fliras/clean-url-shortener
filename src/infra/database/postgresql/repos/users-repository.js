import db from '../knexfile.js';

export default class UsersRepository {
  async loadById(userId) {
    const user = await db('users').first().where({ user_id: userId });
    return this.#map(user);
  }

  #map(user) {
    return {
      userId: user.user_id,
      username: user.username,
      password: user.password,
      createdAt: user.created_at,
    };
  }
}