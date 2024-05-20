

import { sql } from '@vercel/postgres';

export async function load({ parent }) {
    const data = await parent();
    
    const classmates = await sql`
        SELECT 
            c.fullname,
            co.coursename,
            c.id AS id, 
            round(avg(r.rating)::numeric, 1) AS average_rating 
        FROM
            courses AS co,
            courses AS my_course,
            classmates AS c
        LEFT JOIN Ratings as r 
            ON rated_to_id = c.id
        WHERE
            co.studentid = c.id
        AND
            co.coursename = my_course.coursename
        AND
            my_course.studentid = ${data.userid}
        AND 
            co.studentid <> my_course.studentid
            
        GROUP BY 
            c.id, co.coursename
        ORDER BY
            c.fullname` 
	
       //parseint data.userid ???
    let summarised = [];
    let lastname = '';
    
    for(const row of classmates.rows){
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
    const result = await sql`
    SELECT 
    COUNT(*) AS count
    
    FROM friends
   
    WHERE (person1_id = ${userid} AND person2_id = ${classmateid})
    OR (person2_id = ${userid} AND person1_id = ${classmateid})`

    
    return result.rows[0].count > 0;
}
   
