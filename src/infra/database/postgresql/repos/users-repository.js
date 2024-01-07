import db from '../db.js';

export default class UsersRepository {
  async loadById(userId) {
    const user = await db('users').first().where({ user_id: userId });
    return user && this.#map(user);
  }

  async checkByUsername(username) {
    const user = await this.loadByUsername(username);
    return user !== undefined;
  }

  async loadByUsername(username) {
    const user = await db('users').first().where({ username });
    return user && this.#map(user);
  }

  async add(user) {
    const [newUser] = await db('users').insert(user).returning('*');
    return this.#map(newUser);
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
