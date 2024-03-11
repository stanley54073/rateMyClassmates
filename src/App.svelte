<script>
	import { onMount } from "svelte";
	let showForm = false; 
	import Button from "./Button.svelte"
	
	function openForm(){
		showForm = true;
	}
	
onMount(() => {
	
	showForm = false;
});
</script>



<Button class = "primary" on:click={openForm}> <!--when click on create acc button !>-->
	Create Account
</Button>

{#if showForm}
	<form class="form">
		
		<input type="email" placeholder="Email">
		<input type="password" placeholder="Password">
		<input type="text" placeholder="First and Last name">
		<button type="submit">Submit</button>
		<button type="reset">Cancel</button>
	</form>
{/if}



<main>
	<h1>RateMyClassmates</h1>
	<p> This is a website used to find potential project partners!</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #00c3ff;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>