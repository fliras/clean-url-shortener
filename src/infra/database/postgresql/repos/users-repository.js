import db from '../db.js';

export default class UsersRepository {
  async loadById(userId) {
    const user = await db('users').first().where({ user_id: userId });
    return user && this.#map(user);
  }

  async loadByUsername(username) {
    const user = await db('users').first().where({ username });
    return user && this.#map(user);
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
