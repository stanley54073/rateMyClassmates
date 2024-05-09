
import {database_handle} from '$lib/server/database';
let db;

export async function load({ parent }) {
    const data = await parent();
    if (!db) {
        db = database_handle();
    }

    
    const sql = `
        SELECT 
            c.fullname,
            co.coursename,
            c.rowid AS id, 
            round(avg(r.rating), 1) AS average_rating 
        FROM
            courses AS co,
            courses AS my_course,
            classmates AS c
        LEFT JOIN Ratings as r 
            ON rated_to_id = c.rowid
        WHERE
            co.studentid = c.rowid
        AND
            co.coursename = my_course.coursename
        AND
            my_course.studentid = ?
        AND 
            co.studentid <> my_course.studentid
            
        GROUP BY 
            c.rowid, co.coursename
        ORDER BY
            c.fullname` 
	
    const stmt = db.prepare(sql);
    const rows = stmt.all(parseInt(data.userid));
    
    let summarised = [];
    let lastname = '';
    
    for(const row of rows){
        const alreadyFriends = await checkIfFriends(data.userid, row.id);
        
        if (row.fullname === lastname){
            summarised[summarised.length - 1].coursename += ', ' + row.coursename;
        }
        else {
            summarised.push({
                fullname: row.fullname,
                id:row.id,
                average_rating: row.average_rating,
                coursename: row.coursename,
                friendstatus: alreadyFriends
            });
           
            lastname = row.fullname;
        }
            
    }

    console.log(summarised); 
    return { classmates: summarised};

}

async function checkIfFriends(userid, classmateid) {
    const sql = `
    SELECT 
    COUNT(*) AS count
    
    FROM friends
   
    WHERE (person1_id = ? AND person2_id = ?)
    OR (person2_id = ? AND person1_id = ?)`
    
    const stmt = db.prepare(sql);
    const result = stmt.get(
        userid, classmateid, userid, classmateid
    );
    
    return result.count > 0;
}
   
