import { Pool } from 'pg';

export default new Pool({
    host: 'localhost',
    port: 5432,
    database: 'gifter-db',
    user: 'gifter',
    password: 'pass',
});
