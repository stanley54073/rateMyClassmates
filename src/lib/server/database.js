import postgres from 'postgres';

import {PGCONNECT} from '$env/static/private';

const sql = postgres(PGCONNECT, { 
    username: 'stanley',
    host: 'localhost',
    database: 'classmates',
    port: 5432, 
});

export default sql;

