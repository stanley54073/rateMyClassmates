<script>
    
    export let data;
    
</script>
   
<h1>
    <span style="font-size:2em;">{data.classmate.average_rating}</span>/5
    <br>
    <span style="font-size:2em;">{data.classmate.fullname} </span><!-- array -->
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
    Linkedin: <a href="https://www.linkedin.com/in/{data.classmate.linkedin}/" target="_blank">{data.classmate.fullname}</a>
    <br>
</p>

<h3>
    Reviews
</h3>

<!-- need student comments here -->
<!-- only post comment if id == ratedid ???-->
    
{#each data.reviews as review}
    
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
    .coursename {
        
    }
    
</style>






