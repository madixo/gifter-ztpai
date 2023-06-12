"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    database: 'gifter-db',
    user: 'gifter',
    password: 'pass',
});
