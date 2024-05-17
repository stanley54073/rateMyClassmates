import sql from '$lib/server/database';

export async function load({ params }) {
    //main person info 
    const people = await sql`  
    SELECT
	    c.id AS classmate_id, 
        c.fullname, 
        c.email,
        c.instagram,
        c.discord,
        c.linkedin,
        c.major,
        round(avg(r.rating)::numeric, 1) AS average_rating 
    FROM
	    classmates as c
        
    LEFT JOIN Ratings as r 
    ON rated_to_id = c.id
    

    WHERE
    c.id = ${[params.studentid]}
    
    GROUP BY
        c.id,
        rated_to_id
    
    ORDER BY
        c.fullname`
	

    //console.log({people}); 
    
    // person's ratings 
    const reviews = await sql `  
    SELECT
	    r.id AS review_id, 
        r.comment,
        r.rating,
        r.course_rated,
        r.rated_from_id,
        r.date_of_rating,
        c.fullname AS rated_from_name

    FROM
	    Ratings as r
    LEFT JOIN
        classmates AS c
    ON
        r.rated_from_id = c.id
    WHERE
        rated_to_id = ${[params.studentid]}
    ORDER BY
        r.date_of_rating DESC`

    
    // person's courses 
    const courses = await sql `  
    SELECT
        co.coursename
    FROM
	    courses as co
    WHERE
        studentid = ${[params.studentid]}
    ORDER BY
        co.coursename`
	        
        
    return { classmate: people[0], reviews, courses };

}

export const actions = {
    rate_someone: async ({ request }) => {
        const formData = await request.formData();
        const course =  formData.get("course");
        const date =  formData.get("date");
        const numeric_rating =  formData.get("numeric_rating");
        const review = formData.get("review");
        const ratedfrom_id = 2;
        const ratedto_id = formData.get("id");
  
        const courses = await sql`  
        INSERT INTO Ratings (course_rated, date_of_rating, rating, comment, rated_from_id, rated_to_id) 
        VALUES (${course}, ${date}, ${numeric_rating}, ${review}, ${ratedfrom_id}, ${ratedto_id})`
            
        return {}
    },
    
    add_friend: async ({ request }) => {

        const formData = await request.formData();
        const userid = formData.get("userid");
        const classmateid = formData.get("classmateid");
        const date = formData.get("date");
        
        const alreadyFriends = await checkIfFriends(userid, classmateid);
        const requestAlreadySent = await checkRequestSent(userid, classmateid);
        
        //if not already friends, send friend request 
        if(!alreadyFriends && !requestAlreadySent) {
            const friends = await sql`  
            INSERT INTO friend_request (from_id, to_id, as_of)
            VALUES (${userid}, ${classmateid}, ${date})`
            
        }
        
        console.log("alreadyfriends:", alreadyFriends);
        console.log("request already sent:", requestAlreadySent);
       
        return { alreadyFriends, requestAlreadySent};
    },
    
};
//true if count > 0 bc that means already friends 
async function checkIfFriends(userid, classmateid) {
    const result = await sql`
    SELECT 
    COUNT(*) AS count
    
    FROM friends
   
    WHERE (person1_id = ${userid} AND person2_id = ${classmateid})
    OR (person2_id = ${userid} AND person1_id = ${classmateid})`
    
    return result[0].count > 0;
}

//true if count > 0 bc that means friend request already sent by either 
async function checkRequestSent(userid, classmateid) {
    const result = await sql`
    SELECT 
    COUNT(*) AS count
    
    FROM friend_request
   
    WHERE (from_id = ${userid} AND to_id = ${classmateid})
    OR (to_id = ${userid} AND from_id = ${classmateid})`
    
    
    return result[0].count > 0;
}