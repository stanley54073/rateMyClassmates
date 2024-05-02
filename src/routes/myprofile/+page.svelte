<script>
    import { onMount } from "svelte";
    export let data;
    export let form; 
    let showForm = false; 
    
    function openForm(){
        showForm = !showForm;
    }
    
    function resetForm(){
        data.classmate.major = '';
        showForm = false;
    }
	
    
    onMount(() => {
	    showForm = false;
    });
    
    

</script>


{#if showForm}
	<form class="form" method="POST" action='?/save_changes'>

        Enter your
        <label for="major"> major:</label> 
        <input type="major" placeholder="computer science" name="major"> 
        <input type="hidden" name="userid" value={data.userid}>
        
        
        <button type="submit">Submit</button> 
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
        Name: {data.classmate.fullname}
        <br>
        Email: {data.classmate.email}
        <br>
        Major: {data.classmate.major}
        <br>
        Courses: {data.classmate.courses}
        
        <br><br>
        --Social Media-- 
        
            <br>
            Instagram: {data.classmate.instagram}
            <br>
            Discord: {data.classmate.discord}
            <br>
            Linkedin: {data.classmate.linkedin}
    
    
       
    </h2>
</main>


<style>
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
</style>
