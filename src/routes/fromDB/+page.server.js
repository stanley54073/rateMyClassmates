
import {database_handle} from '$lib/server/database';

let db;

export async function load() {
    if (!db) {
        db = database_handle();
    }
    const sql = `
    SELECT
        id, 
        fullname,
        email
    FROM
        classmates`;
    const stmt = db.prepare(sql);
    const rows = stmt.all();

    console.log({rows}); 
    
    return { classmates: rows };
    

}
