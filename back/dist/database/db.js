"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const { DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const connection = new sequelize_typescript_1.Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_DATABASE}`, {
    models: [__dirname + '/models']
});
connection.authenticate()
    .then(() => {
    console.log('Successfully connected to database');
})
    .catch((err) => console.error(err));
exports.default = connection;
