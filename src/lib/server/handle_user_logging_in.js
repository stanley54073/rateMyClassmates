
import sql from './database.js';
import { sql } from '@vercel/postgres';
import { serverAuth } from '$lib/server/firebaseServerApp';

// SUPERUSER_ROLE: this role name has access to ALL routes
import { SUPERUSER_ROLE, NEW_USER_ROLE } from '$env/static/private';



export const handle_user_logging_in = async (claims) => {


    // if the user is already assigned a (valid) application-specific
    // user id, we're done.
    // FIXME: should check if this name/email already exists in the database?
	if (claims.application_userid) {
        // if we're concerned that our userids have leaked or changed,
        // enable this code

        console.log(`Testing for presence of app user id ${claims.application_userid} in database.`);

        // YOU MUST CONFIGURE: table names, column names.
        // vvvvvvvvv


        const test_user_validitycount = await sql`
        SELECT COUNT(*) as is_valid 
        FROM classmates 
        WHERE id = ${claims.application_userid}`;
        const user_is_valid = test_user_validitycount[0].is_valid == 1;

        if (user_is_valid) {
            return;
        }
        console.log(`ERROR: User ${claims.email} has an invalid application_userid (${claims.application_userid}).`);

        // ^^^^^^^^^
    }

    //console.log("handle_user_logging_in",{claims})
    const uid = claims['uid'];

    // A new (never been seen before) user has signed in.
    // We need to choose an application-relevant user is for them,
    // and probably assign basic roles.
    //
    // this may also be the best place to assign a default role to all new users,
    // and the admin role to the first user who logs in.
    //

    // assign a application-specific user id

    // YOU MUST CONFIGURE: table names, column names.
    // vvvvvvvvv
    const test_user_validitycount = await sql`
    INSERT INTO
    classmates (email, fullname, major)
    VALUES
    (${claims.email}, ${claims.name}, 'not declared' )
    RETURNING id`;
  

    
    const newUserId = test_user_validitycount[0].id;
    console.log(newUserId);
        
    if (newUserId === null) {
        console.error("Error creating user record for ",{claims});
        return;
    }

    const user_count_sql = await sql
    `SELECT COUNT(*) as user_count 
    FROM classmates`;
    const first_user = user_count_sql[0].user_count == 1;
    
    
    console.log({user_count:user_count_sql[0].user_count, first_user, newUserId});

    // ^^^^^^^^^

    // "customClaims" is a subset of all claims returned
    let claimsToSet = {...claims};
    ["aud", "auth_time", "exp", "iat", "iss", "sub", "firebase"]
        .map( (cl) => delete claimsToSet[cl] );

    // We add either two or three claims.
    claimsToSet['application_userid'] = newUserId;

    // all new users get this role
    claimsToSet['approle_'+NEW_USER_ROLE] = true;
    console.log("New user "+claims.email+" assigned "+NEW_USER_ROLE+" role");

	// Make the first user an admin!
	if (first_user) {
		claimsToSet['approle_'+SUPERUSER_ROLE] = true;
		console.log("Adding "+SUPERUSER_ROLE+" role to "+claims.email+" (since first user)");
	}

    await serverAuth.setCustomUserClaims(uid, claimsToSet);
};
