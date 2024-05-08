<script>
    
    import { onMount } from "svelte";
    export let data;
    export let form; 
    let showForm = false; 
    let sliderval = 3;
    let currDate = new Date(); 
    
	function openForm(){
		showForm = !showForm;
	}
    
    function resetForm(){
        sliderval = 3;
        
        data.classmate.course_rated = '';
        data.classmate.Date_of_Rating = '';
        data.classmate.comment = '';
        showForm = false;
    }
    
    function addFriend(){
        // if already friends and request already sent, alert request already sent
        
        //else alert friend request sent
            alert("Friend request sent !! :)");  
    }
    
	
    onMount(() => {
        document.getElementById("date").value = currDate.toDateString();
    
	    showForm = false;
});

</script>

{#if showForm}
	<form class="form" method="POST" action='?/rate_someone'>
        <input type="hidden" name="id" value={data.classmate.id}/>
        
        <h1 class="header"> Rate: {data.classmate.fullname} </h1>
        
        <label for="course"> Course:</label> 
        <input type="course" placeholder="CPSC 121" name="course"> 
        
        <label for="date"> Date:</label> 
        <input type="date" name="date"> <br><br>
        
        Rate your classmate: <br>
        <input type = "range" name="numeric_rating" min="1" max="5" bind:value={sliderval}> <br>
        Rating: {sliderval} <br><br>
        <!-- save into data.classmate.rating-->
        
        <label for="review"> Write a Review: </label> <br>
        <textarea id="review" name="review"></textarea>
        
        <button type="submit">Submit</button> 
        
        <button type="reset" on:click={resetForm}>Cancel</button> 
      
        
	</form>
{/if}

{#if form && form.message}
    <h2>
        {form.message}
    </h2>
{/if}

<h1>
    <span style="font-size:2em;">{data.classmate.average_rating}</span>/5
    <br>
    
    
    <!-- FRIEND REQUEST -->
        <form method="POST" action='?/add_friend'>
            <span style="font-size:2em;">{data.classmate.fullname} </span> 
            <input type="hidden" name="userid" value={data.userid}/>
            <input type="hidden" name="classmateid" value={data.classmate.id}/>
            <input type="hidden" id="date" name="date" value={currDate} />
            <button on:click={addFriend} type="submit" style="font-size: 0.5em;"> Add Friend </button>

        </form>
    <br>
    
    *Major: {data.classmate.major}
</h1>


<h2>
    Courses: 
    {#each data.courses as course}
    
    <div class="coursename">
        {course.coursename}
    </div>
    
  
   
    
    {/each}
    <br><br>
    --Social Media-- 
</h2>
<p>
    Email: <a href="mailto:{data.classmate.email}">{data.classmate.email}</a> 
    <br>
    Instagram: <a href="https://www.instagram.com/{data.classmate.instagram}/" target="_blank">{data.classmate.instagram}</a>
    <br>
    Discord: <a href="https://www.discord.com/users/{data.classmate.discord}/" target="_blank">{data.classmate.discord}</a>
    <br>
    Linkedin: <a href="https://www.linkedin.com/in/{data.classmate.linkedin}/" target="_blank">{data.classmate.linkedin}</a>
    <br>
</p>

<h3>
    Reviews
    
    <button on:click={openForm}>
        Rate
    </button>
</h3>


<!-- need student comments here -->
<!-- only post comment if id == ratedid ???-->

    
{#each data.reviews as review}
    
   <strong style ="margin-right:70px;">{review.course_rated} </strong>
    {review.Date_of_Rating}
   <br>
    <div class="rating">
        {review.rating}.0
    </div>
    
    <div class="comment">
        {review.comment} 
    </div>
    <br>
    
{/each}
   



<style>
    .rating {
        display:inline-block;
        font-style: italic;
        vertical-align: top;
        font-size:1em;
    }
    .comment {
        font-size:1em;
    }
  
    
    button {
        font-family: Georgia, 'Times New Roman', Times, serif;
        color:blue;
        font-size:0.75em;
        padding: 5px 10px;
        border-radius:20px;
        background-color: aqua;
    }
    .form {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /*center form*/
		
		width: 400px;
        height: 300px;
		padding: 50px;
		background-color: lightblue;
		border-radius: 10px;
		
	
	}
    .header{
        text-align:center;
    }
    textarea {
        height:60px;
        width: 390px;
    }


</style>






