"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//gerencia o banco de dados
const knex_1 = __importDefault(require("knex"));
const path_1 = __importDefault(require("path"));
//migrations: controla as versoes do banco de dados; 
const db = (0, knex_1.default)({
    client: 'sqlite3',
    connection: {
        filename: path_1.default.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});
exports.default = db;
