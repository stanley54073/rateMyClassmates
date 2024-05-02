<script>
	import { auth } from '$lib/auth';
</script>

<main>
	<header class="space-y-4">
		<nav class="flex gap-4">
			{#if $auth === undefined}
				Loading...
			{:else if $auth === null}
				<button class="hover:underline" on:click={auth.sign_in}>Sign In</button>
			{:else}
				<button class="hover:underline" on:click={auth.sign_out}>Sign Out</button> | {$auth.displayName}
				|
				<img class="profile_pic" src={$auth.photoURL} alt="Profile Picture" />
			{/if}
			
			<div class="tabs">
				<a href="/">Home</a> |
				<a href="/classmates">Classmates</a> |
				<a href="/myprofile">My profile</a>
			</div>
		
		</nav>
	</header>
</main>

<style lang="postcss">
	h1 {
		color: darkred;
		background: #eee;
	}
	.profile_pic {
		width: 50px;
		height: 50px;
	}
	.tabs {
		display: flex;
		gap: 10px;
		margin-top: 2em;

	}
</style>
