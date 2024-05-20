
import { sql } from '@vercel/postgres';

export async function load({ parent }) {
    const data = await parent();
    
    const f_requests = await sql`  
    SELECT
	    c.id AS id, 
        c.fullname,
        f.from_id,
        f.as_of AS date
    FROM
	    classmates AS c
    LEFT JOIN
        friend_request as f
    ON
        f.from_id = c.id
    WHERE 
        to_id = ${data.userid}
    ORDER BY
        c.fullname`
	

    
    
    let summarised = [];
    let lastname = '';
    
    // prevent duplicates 
    for(const row of f_requests.rows){
        if (row.fullname !== lastname){
            summarised.push({
                fullname: row.fullname,
                from_id: row.from_id,
                date: row.date
            });
           
            lastname = row.fullname;
        }
            
    }

 
    return { classmate: summarised };

}

export const actions = {
    accept: async ({ request }) => {
        const formData = await request.formData();
        
        const from_id = formData.get("from_id");
        const to_id = formData.get("to_id");
        
        // update friends 
        const sqlInsert = await sql `  
        INSERT INTO friends (person1_id, person2_id)
        VALUES (${from_id}, ${to_id})`
        
        const sqlDelete = await sql `
        DELETE FROM friend_request 
        WHERE from_id = ${from_id} AND to_id = ${to_id}`
    
    
            
        return {}
    },
    
    decline: async ({ request }) => {
        const formData = await request.formData();
        
        const from_id = formData.get("from_id");
        const to_id = formData.get("to_id");
        
        const dsql = await sql`  
        DELETE FROM friend_request 
        WHERE from_id = ${from_id} AND to_id = ${to_id}`
    
        return {}
    },
    
    
};