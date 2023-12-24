import knex from 'knex';

const connection = {
  db: null,
  connectionString: null,

  async connect(connectionString) {
    if (!connectionString) throw new Error('database params not informed');
    this.connectionString = connectionString;
    this.db = knex({
      client: 'pg',
      connection: connectionString,
      pool: {
        min: 2,
        max: 10,
      },
      debug: false,
    });
  },

  async getConnection() {
    if (!this.db) await this.connect(this.connectionString);
    return this.db;
  },
};

export default connection;
