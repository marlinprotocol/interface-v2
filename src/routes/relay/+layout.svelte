<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';

	$: chainSupported = $chainStore.chainId
		? environment.supported_chains.receiver_portal.includes($chainStore.chainId)
		: true;
</script>

{#if $chainStore.isValidChain && chainSupported}
	<slot />
{:else}
	<NetworkPrompt />
{/if}
