<script>
	import { auth } from '$lib/auth';
	import bell from './icons/bell_icon.png'
	
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
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="profile_pic" src={$auth.photoURL} alt="Profile Picture" />
			{/if}
			
			<div class="tabs">
				<a href="/">Home</a> |
				<a href="/classmates">Classmates</a> |
				<a href="/myprofile">My profile</a> |
				<a href="/friendrequests">
					<button class="notifs"> 
						<img src={bell} alt="bellicon" />
					</button>
				</a>
			
			</div>
		
		</nav>
	</header>
</main>

<style lang="postcss">
	.profile_pic {
		width: 50px;
		height: 50px;
	}
	.tabs {
		display: flex;
		gap: 10px;
		margin-top: 2em;

	}
	.notifs {
		background-color: transparent;
		border:none;
		cursor:pointer;
	}
	.notifs img{
		width:15px;
		height:15px;
	}

</style>
