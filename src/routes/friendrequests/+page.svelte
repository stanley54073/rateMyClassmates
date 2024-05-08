<script>
    export let data; 
    
</script>

<h1>
    Friend Requests  
</h1>

<main>
  
    {#if data && data.classmate &&data.classmate.length > 0}
        {#each data.classmate as classmate}
       
                {classmate.fullname} sent you a friend request ! 

            <div class="buttons">
                <form method="POST" action = "?/accept">
                        <input type="hidden" name="from_id" value={classmate.from_id}>
                        <input type="hidden" name="to_id" value={data.userid}>
                        <button type="submit"> accept </button>
                </form>
                
                <form method="POST" action = "?/decline">
                        <input type="hidden" name="from_id" value={classmate.from_id}>
                        <input type="hidden" name="to_id" value={data.userid}>
                        <button type="submit"> decline </button>
                </form>
            </div>
            <br>
        {/each}
    {:else}
        <p> No friend requests... </p>
    {/if}
</main>


<style>
    .buttons{
        display: flex;
    }

</style>