<script>
	import Forbidden from '$lib/Forbidden.svelte';
	import PageHeader from '$lib/PageHeader.svelte';

	export let data;
</script>

<PageHeader />

<!-- <pre>{JSON.stringify(data.user_record,null,2)}</pre> -->
{#if data.grant_access}
	<slot />
{:else}
	<Forbidden />
{/if}


 <pre>{JSON.stringify(data, null, 2)}</pre> 

<style lang="postcss">
	:global(body) {
		background-color: white;
	}
	
</style>