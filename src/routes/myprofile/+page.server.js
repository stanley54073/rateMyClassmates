import {database_handle} from '$lib/server/database';
let db;

export async function load({ parent }) {
    const data = await parent();
    console.log("in load", { data });
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
    
        const rsql = `  
        SELECT
            r.rowid AS id, 
            r.comment,
            r.rating,
            r.course_rated,
            r.rated_from_id,
            r.Date_of_Rating
    
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
        const reviews = rstmt.all(data.userid);
        
        
    return { classmate: rows[0], courses, reviews };

}

export const actions = {
    save_changes: async ({ request }) => {
        if (!db) {
            db = database_handle();
        }
        const formData = await request.formData();
  
        const sql = `  
        UPDATE
            classmates
        SET
            fullname = ?,
            email = ?,
            major = ?,
            instagram = ?,
            discord = ?,
            linkedin = ?
        WHERE 
            rowid = ?`
        
        const stmt = db.prepare(sql);
        const classmates = stmt.run(
            formData.get("name"),
            formData.get("email"),
            formData.get("major"),
            formData.get("insta"),
            formData.get("disc"),
            formData.get("linkedin"),
            formData.get("userid"));
            
            
            
              // update person's courses 
        const csql = `  
        INSERT INTO Courses (coursename, studentid)
        VALUES (?, ?)`
    
        
        const cstmt = db.prepare(csql);
        const courses = cstmt.run(
            formData.get("courses"),
            formData.get("userid")

        );
    
            
        return { message:'success'}
    },
    
    delete_course: async ({ request }) => {
        if (!db) {
            db = database_handle();
        }
        const formData = await request.formData();
        
        const dsql = `  
        DELETE FROM Courses 
        WHERE coursename = ? AND studentid = ?`
    
        
        const dstmt = db.prepare(dsql);
        const courses = dstmt.run(
            formData.get("coursename"),
            formData.get("userid")

        );
        return {}
    },
    
    
};