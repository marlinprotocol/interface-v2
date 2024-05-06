<script>
	import { setAllowedChainsStore } from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.dashboard);
	});
</script>

<slot />
