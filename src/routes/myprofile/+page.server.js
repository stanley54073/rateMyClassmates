
import { sql } from '@vercel/postgres';

export async function load({ parent }) {
    const data = await parent();
    console.log("in load", { data });
    
    const classmateRows = await sql`  
    SELECT
	    c.id AS id, 
        c.fullname, 
        c.email,
        c.major,
        c.instagram,
        c.discord,
        c.linkedin,
        round(avg(r.rating)::numeric, 1) AS average_rating 
    FROM
	    classmates AS c
    LEFT JOIN Ratings as r 
    ON rated_to_id = c.id

    WHERE 
        c.id = ${data.userid}
        
    GROUP BY 
	    c.id
    
    ORDER BY
        c.fullname`

const classmate = classmateRows.rows[0];
    
        // person's courses 
        const courseRows = await sql`  
        SELECT
            co.coursename
        FROM
            courses as co
        WHERE
            studentid = ${data.userid}
        ORDER BY
            co.coursename`
        
    const courses = courseRows.rows;
    
        const reviewsRows = await sql`  
        SELECT
            r.id AS id, 
            r.comment,
            r.rating,
            r.course_rated,
            r.rated_from_id,
            r.date_of_rating
    
        FROM
            Ratings as r
        LEFT JOIN
            classmates AS c
        ON
            r.rated_from_id = c.id
        WHERE
            rated_to_id = ${data.userid}
        ORDER BY
            r.date_of_rating DESC`
        
            
            const reviews = reviewsRows.rows;
        
    return { classmate, courses, reviews };

}

export const actions = {
    save_changes: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const major = formData.get("major");
        const insta = formData.get("insta");
        const disc = formData.get("disc");
        const linkedin = formData.get("linkedin");
        const userid = formData.get("userid");
  
        const classmates = await sql`  
        UPDATE
            classmates
        SET
            fullname = ${name},
            email = ${email},
            major = ${major},
            instagram = ${insta},
            discord = ${disc},
            linkedin = ${linkedin}
        WHERE 
            id = ${userid}`
        
            
            
              // update person's courses -- only send courses if not blank input
        const courseFormData = formData.getAll("courses").filter(course => course.trim() !== "");
            if(courseFormData.length > 0) {
                for(const course of courseFormData) {
                    const csql = await sql`  
                    INSERT INTO Courses (coursename, studentid)
                    VALUES (${course}, ${userid})`
     
                }
            }
    
            
        return { message:'success'}
    },
    
    delete_course: async ({ request }) => {
        const formData = await request.formData();
        const coursename = formData.get("coursename");
        const userid =  formData.get("userid");
        
        const dsql = await sql `  
        DELETE FROM Courses 
        WHERE coursename = ${coursename} AND studentid = ${userid}`
    
      
        return {}
    },
    
    
};