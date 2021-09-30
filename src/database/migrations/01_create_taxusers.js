const knex = require('knex');

export async function up(knex) {
  return knex.schema.createTable('taxusers', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTable('taxusers');
}