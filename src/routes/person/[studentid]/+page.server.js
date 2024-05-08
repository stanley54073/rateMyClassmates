import {database_handle} from '$lib/server/database';

let db;

export async function load({ params }) {
    if (!db) {
        db = database_handle();
    }
    //main person info 
    const sql = `  
    SELECT
	    c.rowid AS id, 
        c.fullname, 
        c.email,
        c.instagram,
        c.discord,
        c.linkedin,
        c.major,
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

    //console.log({people}); 
    
    // person's ratings 
    const rsql = `  
    SELECT
	    r.rowid AS id, 
        r.comment,
        r.rating,
        r.course_rated,
        r.rated_from_id,
        r.Date_of_Rating,
        c.fullname AS rated_from_name

    FROM
	    Ratings as r
    LEFT JOIN
        classmates AS c
    ON
        r.rated_from_id = c.rowid
    WHERE
        rated_to_id = ?
    ORDER BY
        r.Date_of_Rating DESC`
	
    const rstmt = db.prepare(rsql);
    const reviews = rstmt.all([params.studentid]);
    
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
    const courses = cstmt.all([params.studentid]);
        
        
    return { classmate: people[0], reviews, courses };

}

export const actions = {
    rate_someone: async ({ request }) => {
        const formData = await request.formData();
  
        const csql = `  
        INSERT INTO Ratings (course_rated, Date_of_Rating, rating, comment, rated_from_id, rated_to_id) 
        VALUES (?, ?, ?, ?, ?, ?)`
        
        const cstmt = db.prepare(csql);
        const courses = cstmt.run(
            formData.get("course"),
            formData.get("date"),
            formData.get("numeric_rating"),
            formData.get("review"),
            2,
            formData.get("id"));
            
        return {}
    },
    
    add_friend: async ({ request }) => {
        if (!db) {
            db = database_handle();
        }
        const formData = await request.formData();
        const userid = formData.get("userid");
        const classmateid = formData.get("classmateid");
        const date = formData.get("date");
        
        const alreadyFriends = await checkIfFriends(userid, classmateid);
        const requestAlreadySent = await checkRequestSent(userid, classmateid);
        
        //if not already friends, send friend request 
        if(!alreadyFriends && !requestAlreadySent) {
            const fsql = `  
            INSERT INTO friend_request (from_id, to_id, as_of)
            VALUES (?, ?, ?)`
            
            const fstmt = db.prepare(fsql);
            const friends = fstmt.run(
                userid, classmateid, date
    
            );
        }
        
        console.log("alreadyfriends:", alreadyFriends);
        console.log("request already sent:", requestAlreadySent);
       
        return { alreadyFriends, requestAlreadySent};
    },
    
};
//true if count > 0 bc that means already friends 
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

//true if count > 0 bc that means friend request already sent by either 
async function checkRequestSent(userid, classmateid) {
    const sql = `
    SELECT 
    COUNT(*) AS count
    
    FROM friend_request
   
    WHERE (from_id = ? AND to_id = ?)
    OR (to_id = ? AND from_id = ?)`
    
    const stmt = db.prepare(sql);
    const result = stmt.get(
        userid, classmateid, userid, classmateid
    );
    
    return result.count > 0;
}