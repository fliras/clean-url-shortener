/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
  debug: false,
};
