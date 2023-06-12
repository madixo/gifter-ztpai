import {Sequelize} from "sequelize-typescript";
const {DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const connection = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_DATABASE}`, {
    models: [__dirname + '/models']
});

connection.authenticate()
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch((err) => console.error(err));

export default connection;