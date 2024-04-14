
import {database_handle} from '$lib/server/database';

let db;

export async function load() {
    if (!db) {
        db = database_handle();
    }
    
    const sql = `  
SELECT
	c.rowid AS id, 
    c.fullname, 
    avg(r.rating) AS average_rating 
FROM
	classmates AS c
LEFT JOIN Ratings as r 
ON rated_to_id = c.rowid

GROUP BY 
	c.rowid
    
ORDER BY
    c.fullname`
	
        
    const stmt = db.prepare(sql);
    const rows = stmt.all();

    console.log({rows}); 

    
    return { classmates: rows
    };

}
