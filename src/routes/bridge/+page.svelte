<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getBridgeContractDetails } from '$lib/controllers/contractController';
	import {
		getPondAndMpondBridgeAllowances,
		getRequestedMPondForConversion
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import BridgeDashboard from '$lib/page-components/bridge/BridgeDashboard.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		await getBridgeContractDetails();
	});

	async function init() {
		const allowances = await getPondAndMpondBridgeAllowances(
			$walletStore.address,
			$contractAddressStore.Bridge
		);
		const requestedMpond = await getRequestedMPondForConversion($walletStore.address);
		bridgeStore.set({
			allowances: {
				pond: allowances.pond,
				mpond: allowances.mpond
			},
			requestedMpond: requestedMpond
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
