"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('taxusers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('taxusers');
}
exports.down = down;
