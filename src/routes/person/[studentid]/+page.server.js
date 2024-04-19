import {database_handle} from '$lib/server/database';

let db;

export async function load({ params }) {
    if (!db) {
        db = database_handle();
    }
    
    const sql = `  
    SELECT
	    c.rowid AS id, 
        c.fullname, 
        c.email,
        round(avg(r.rating), 1) AS average_rating 
    FROM
	    classmates as c
        
    LEFT JOIN Ratings as r 
    ON rated_to_id = c.rowid
    

    WHERE
    id = ?
    
    GROUP BY
        rated_to_id
    
    ORDER BY
        c.fullname`
	
    const stmt = db.prepare(sql);
    const people = stmt.all([params.studentid]);

    console.log({people}); 
    
    const rsql = `  
    SELECT
	    r.rowid AS id, 
        r.comment,
        r.rating
    FROM
	    Ratings as r

    WHERE
    rated_to_id = ?
    
    
    ORDER BY
        r.rating`
	
    const rstmt = db.prepare(rsql);
    const reviews = rstmt.all([params.studentid]);
        
    return { classmate: people[0], reviews };

}