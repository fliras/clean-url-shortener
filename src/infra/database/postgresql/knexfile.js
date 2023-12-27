import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  debug: false,
});

export default db;
