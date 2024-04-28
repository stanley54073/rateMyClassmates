

<script>
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import Button from "./Button.svelte";
	
	let showForm = false; 
	let email = '', password = '', fullname = '';
	const dispatcher = createEventDispatcher();
	

	function openForm(){
		showForm = !showForm;
	}
	
	//form submission 
	async function handleSubmit(event) {
		event.preventDefault();
		
		//Post request sent to the backend 
		const response = await fetch('http://localhost:5174', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email, password, fullname})
		});
		
		if (response.ok) {	//if user is registered correctly else not 
			console.log('User registered!');
			dispatcher('registration-success');
		} else {
			console.error('user not registered')
		}
	}

onMount(() => {
	
	showForm = false;
});
</script>

<nav class="login">
	<div class="login_button">
		<button>Login</button>
	</div>
</nav>


<Button class = "primary" on:click={openForm}> <!--when click on create acc button !>-->
	Create Account
</Button>



{#if showForm}
	<form class="form">
		<!-- POST REQUEST ??-->
		<input type="email" placeholder="Email" bind:value={email}>
		<input type="password" placeholder="Password" bind:value={password}>
		<input type="text" placeholder="Full name" bind:value={fullname}>
		<button type="submit">Submit</button>
		<button type="reset">Clear</button>
		<button type="button" on:click={openForm}>Cancel</button>
	</form>
{/if}


<main>
	<h1>RateMyClassmates</h1>
	<p> This is a website used to find study buddies & project partners!</p>
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
	
	form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /*center form*/
		
		width: 225px;
		padding: 30px;
		background-color: lightblue;
		border-radius: 10px;
		
	
	}
	
	.login {
		display: flex;
		justify-content: flex-end;
		padding: 10px;
	}
	.login_button button{
		font-size: 1em;
		font-family: 'Times New Roman', Times, serif;
		padding: 10px;
		border-radius: 30px;
		background-color: lightblue;
	}
</style>
