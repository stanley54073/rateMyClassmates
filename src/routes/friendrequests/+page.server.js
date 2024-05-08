import {database_handle} from '$lib/server/database';
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
        f.from_id
    FROM
	    classmates AS c
    LEFT JOIN
        friend_request as f
    ON
        f.from_id = c.rowid
    WHERE 
        to_id = ?
    ORDER BY
        c.fullname`
	
    const stmt = db.prepare(sql);
    const rows = stmt.all(data.userid);

    console.log({rows}); 
    
    
    let summarised = [];
    let lastname = '';
    
    // prevent duplicates 
    for(const row of rows){
        if (row.fullname !== lastname){
            summarised.push({
                fullname: row.fullname,
                from_id: row.from_id
            });
           
            lastname = row.fullname;
        }
            
    }

 
    return { classmate: summarised };

}

export const actions = {
    accept: async ({ request }) => {
        if (!db) {
            db = database_handle();
        }
        const formData = await request.formData();
  
        // update friends 
        const sqlInsert = `  
        INSERT INTO friends (person1_id, person2_id)
        VALUES (?, ?)`
        
        const sqlDelete = `
        DELETE FROM friend_request 
        WHERE from_id = ? AND to_id = ?`
    
        
        const istmt = db.prepare(sqlInsert);
        const dstmt = db.prepare(sqlDelete);
        
        const friends = istmt.run(
            formData.get("from_id"),
            formData.get("to_id"),
        

        );
        
        const deletedrequest = dstmt.run(
            formData.get("from_id"),
            formData.get("to_id"),
        
        );
    
            
        return {}
    },
    
    decline: async ({ request }) => {
        if (!db) {
            db = database_handle();
        }
        const formData = await request.formData();
        
        const dsql = `  
        DELETE FROM friend_request 
        WHERE from_id = ? AND to_id = ?`
    
        
        const dstmt = db.prepare(dsql);
        const courses = dstmt.run(
            formData.get("from_id"),
            formData.get("to_id")

        );
        return {}
    },
    
    
};