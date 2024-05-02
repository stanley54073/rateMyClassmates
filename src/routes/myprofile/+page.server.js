import {database_handle} from '$lib/server/database';
import { auth } from '$lib/auth';
let db;

export async function load({ parent }) {
    const data = await parent();
    if (!db) {
        db = database_handle();
    }
    
    const sql = `  
    SELECT
	    c.rowid AS id, 
        c.fullname, 
        c.email,
        c.major,
        c.instagram,
        c.discord,
        c.linkedin,
        round(avg(r.rating), 2) AS average_rating 
    FROM
	    classmates AS c
    LEFT JOIN Ratings as r 
    ON rated_to_id = c.rowid

    WHERE 
        c.rowid = ?
        
    GROUP BY 
	    c.rowid
    
    ORDER BY
        c.fullname`
	
    const stmt = db.prepare(sql);
    const rows = stmt.all(data.userid);

    console.log({rows}); 
    
        // person's courses 
        const csql = `  
        SELECT
            co.coursename
        FROM
            courses as co
        WHERE
            studentid = ?
        ORDER BY
            co.coursename`
        
        const cstmt = db.prepare(csql);
        const courses = cstmt.all(data.userid);
    
    
        
    return { classmate: rows[0], courses };

}

export const actions = {
    save_changes: async ({ request }) => {
        if (!db) {
            db = database_handle();
        }
        const formData = await request.formData();
  
        const csql = `  
        UPDATE
            classmates
        SET
            major = ?
        WHERE 
            rowid = ?`
        
        const cstmt = db.prepare(csql);
        const courses = cstmt.run(
            formData.get("major"),
            formData.get("userid"));
            
        return { message:'success'}
    },
    
    
};