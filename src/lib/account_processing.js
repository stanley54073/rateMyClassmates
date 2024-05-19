//import sql from '$lib/server/database';
import { sql } from '@vercel/postgres';
import { serverAuth } from '$lib/firebase-server';

// SUPERUSER_ROLE: this role name has access to ALL routes
import { SUPERUSER_ROLE, NEW_USER_ROLE } from '$env/static/private';



export const user_logged_in = async (claims) => {

    // if the user is already assigned an application-specific user id, we're done.
	if (claims.application_userid) {
        // unless we wanted to track when people logged in...
        return;
    }

    //console.log("user_logged_in",{claims})
    let uid = claims['uid'];

    // A new (never been seen before) user has signed in.
    // We need to choose an application-relevant user is for them,
    // and probably assign basic roles.
    //
    // this may also be the best place to assign a default role to all new users,
    // and the admin role to the first user who logs in.
    //

    // assign a application-specific user id
    // SAMPLE CODE ACCESSING A DATABASE
    // vvvvvvvvv
  
    const user_count_sql = await sql`
    INSERT INTO
        classmates (email, fullname, major)
    VALUES
        (${claims.email}, ${claims.name}, 'not specified')`;

    const newUserId = user_count_sql[0].id; 
    //application_user.id
    
    const user_count_stmt = await sql
    `SELECT COUNT(*) as user_count 
    FROM classmates`;
    
    const first_user = user_count_stmt[0].user_count == 1;
    console.log({result, newUserId, user_count, first_user});
    // ^^^^^^^^^

    // simple default. just use Firebase's UID
    // (if we're not doing something cute with database)
    //const newUserId = uid;
    // then we would need some other way to track the first user.
    //const first_user = true;

    let claimsToSet = {...claims};
    for (const cant_set_these of ["aud", "auth_time", "exp", "iat", "iss", "sub", "firebase"]) {
        console.log("deleting", cant_set_these);
        delete claimsToSet[cant_set_these];
    }
    claimsToSet['application_userid'] = newUserId;
  
    console.log("after delete", {claimsToSet})

    // all new users get this role
    claimsToSet['approle_'+NEW_USER_ROLE] = true;
    console.log("New user "+claims.email+" assigned "+NEW_USER_ROLE+" role");

	// Make the first user an admin!
	if (first_user) {
		claimsToSet['approle_'+SUPERUSER_ROLE] = true;
		console.log("Adding "+SUPERUSER_ROLE+" role to "+claims.email);
	}

    await serverAuth.setCustomUserClaims(uid, claimsToSet);
};
