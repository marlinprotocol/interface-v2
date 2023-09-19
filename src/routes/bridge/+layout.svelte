<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import {
		chainStore,
		setAllowedChainsStore,
		allowedChainsStore
	} from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.bridge);
	});

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;
</script>

<svelte:head>
	<title>Marlin Bridge</title>
</svelte:head>

{#if $chainStore.isValidChain && chainSupported}
	<slot />
{:else}
	<NetworkPrompt />
{/if}
