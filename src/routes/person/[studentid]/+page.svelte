<script>
    
    export let data;
    
</script>
   
<h1>
    <span style="font-size:2em;">{data.classmate.average_rating}</span>/5
    <br>
    <span style="font-size:2em;">{data.classmate.fullname} </span><!-- array -->
   
</h1>


<h2>
    Social Media: <br>
    {data.classmate.email}

  
    <br><br>
    Reviews
</h2>


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
        font-size:1.5em;
    }
    .comment {
        font-size:1.5em;
    }
    
</style>






