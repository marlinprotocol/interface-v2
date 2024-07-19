<script>
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { setAllowedChainsStore } from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.dashboard);
	});
</script>

<PageWrapper>
	<slot />
</PageWrapper>
