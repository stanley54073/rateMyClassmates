

export async function load({ fetch }){
    
    /* get request to classmates? using fetch */
    const res =  await fetch(`http://localhost:5174/classmates`);
    const obj = await res.json();
    
    return obj; /* return json object*/
    
}

