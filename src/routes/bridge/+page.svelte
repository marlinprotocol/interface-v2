<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import {
		getPondAndMPondBridgeAllowances,
		getRequestedMPondForConversion
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import BridgeDashboard from '$lib/page-components/bridge/BridgeDashboard.svelte';

	async function init() {
		const allowances = await getPondAndMPondBridgeAllowances(
			$walletStore.address,
			$contractAddressStore.Bridge
		);
		const requestedMPond = await getRequestedMPondForConversion($walletStore.address);
		bridgeStore.set({
			allowances: {
				pond: allowances.pond,
				mPond: allowances.mPond
			},
			requestedMPond: requestedMPond
		});
	}

	$: if ($connected) {
		init();
	}
</script>

<div class="py-10">
	{#if $chainStore.isValidChain}
		<BridgeDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
