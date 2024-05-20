<script>
    import { onMount } from "svelte";
    export let data;
    let showForm = false; 
    let valid = true; 
    
    function openForm(){
        showForm = !showForm;
    }
    
    function resetForm(){
        showForm = false;
    }
    
    function validateEmail(){
        //email validation
        const regex = /\S+@\S+\.\S+/;
        valid = regex.test(data.classmate.email);
    }
    
    onMount(() => {
	    showForm = false;
    });
    

</script>


{#if showForm}
	<form class="form" method="POST" action='?/save_changes' onsubmit="return validateForm()">
        Edit your profile page... <br><br>
        <label for="name"> Display Name:</label> 
        <input type="name" placeholder="Jeon Jungkook" name="name" value={data?.classmate?.fullname} required> <br>

        
        <label for="email"> Email:</label> 
        <input type="email" placeholder="jungkookdoop@gmail.com" name="email" value={data?.classmate?.email} on:input{validateEmail}> <br>
        {#if !valid}
            <p> invalid email... </p>
        {/if}
        
        <label for="major"> Major:</label> 
        <input type="major" placeholder="computer science" name="major" value={data?.classmate?.major}> <br>
        
    <!-- insert into courses here -->
        <label for="courses"> Courses:</label> 
        {#each data.courses as course}
            <form method="POST" action = "?/delete_course">
                <div class="coursename">
                    {course.coursename}
                    <input type="hidden" name="coursename" value={course.coursename}>
                    <input type="hidden" name="userid" value={data.userid}>
                    <button type="submit"> delete </button>
                </div>
               
            </form>
        {/each}
        <input type="courses" placeholder="CPSC 253" name="courses"> <br>
 
        
        
        <label for="insta"> Instagram:</label> 
        <input type="insta" placeholder="stan.chong" name="insta" value={data?.classmate?.instagram}> <br>
        <label for="disc"> Discord:</label> 
        <input type="disc" placeholder="stan7912" name="disc"value={data?.classmate?.discord}> <br>
        <label for="linkedin"> Linkedin:</label> 
        <input type="linkedin" placeholder="stanley-chong" name="linkedin" value={data?.classmate?.linkedin}> <br>
        
        
        
        <input type="hidden" name="userid" value={data.userid}>
        
        
        <button type="submit">Save</button> 
        <button type="reset" on:click={resetForm}>Cancel</button> 
        
	</form>
{/if}




<main>
    <h1>
        MY INFO
        <button on:click={openForm}>
            Edit
        </button>
    </h1>
    <h2>
    {#if data && data.classmate}
        Display Name: {data.classmate.fullname}
        <br>
        Email: {data.classmate.email}
        <br>
        Major: {data.classmate.major}
        <br>
        Courses: 
        {#each data.courses as course}
            <div class="coursename">
                {course.coursename}
            </div>
        {/each}
        
     
        <br>
        --Social Media-- 
        
            <br>
            Instagram: <a href="https://www.instagram.com/{data.classmate.instagram}/" target="_blank">{data.classmate.instagram}</a>
             <br>
            Discord: <a href="https://www.discord.com/users/{data.classmate.discord}/" target="_blank">{data.classmate.discord}</a>
             <br>
            Linkedin: <a href="https://www.linkedin.com/in/{data.classmate.linkedin}/" target="_blank">{data.classmate.linkedin}</a>
        
        <br><br>
        My overall rating: {data.classmate.average_rating}/5 <br>
            My Reviews:
            
    {/if}
       
    </h2>
    
    {#if data.reviews}
            {#each data.reviews as review}
                
            <strong style ="margin-right:70px;">{review.course_rated} </strong>
            {review.date_of_rating}
            <br>
            <div class="rating">
                {review.rating}.0
            </div>
            
            <div class="comment">
                {review.comment} 
            </div>
            <br>
            
            {/each}
    {:else}
        <p> No reviews currently. </p>
    {/if}


</main>


<style>
       .form {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /*center form*/
		
		width: 400px;
        height: 350px;
		padding: 50px;
		background-color: lightblue;
		border-radius: 10px;
		
	
	}
</style>
