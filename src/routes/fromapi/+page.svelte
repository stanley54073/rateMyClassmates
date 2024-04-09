<script>
	
    export let data;
    
</script>

<h1> Retrieved from API </h1>

{#each data.classmates as classmate}
    <div>
        <span class="id">{classmate.classmateID}</span>
        <span class="email">{classmate.studentEmail}</span>
        <span class ="name">{classmate.studentName}</span>
    </div>


{/each}

<style>
    .id {
        margin-right:10px;
        font-weight: bold; 
    }
    .email{
        color: blue
    }
    .name{
        color: teal
    }
    
 </style>