<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import {
		allowedChainsStore,
		chainStore,
		setAllowedChainsStore
	} from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.receiver);
	});

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;
</script>

{#if $chainStore.isValidChain && chainSupported}
	<slot />
{:else}
	<NetworkPrompt />
{/if}
