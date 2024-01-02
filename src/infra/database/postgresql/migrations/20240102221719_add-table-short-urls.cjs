/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('short_urls', (table) => {
    table.increments('short_url_id').primary();
    table.string('short_code', 10).notNullable();
    table.string('full_url', 100).notNullable();
    table.integer('clicks').notNullable().defaultTo(0);
    table.timestamp('expiration_date').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table
      .integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('short_urls');
};
