<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
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
	<PageWrapper>
		<slot />
	</PageWrapper>
{:else}
	<NetworkPrompt />
{/if}
