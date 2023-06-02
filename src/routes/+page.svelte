<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getReceiverStakingDataFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import StakeDashboard from '$lib/page-components/receiver-staking/StakeDashboard.svelte';
	import type { ReceiverStakingData } from '$lib/types/storeTypes';

	let prevWalletAddress: string | null = null;
	let prevChainId: number | null = null;

	$: if (
		$walletStore.address !== '' &&
		(prevWalletAddress !== $walletStore.address ||
			prevChainId !== $chainStore.chainId ||
			prevWalletAddress === null ||
			prevChainId === null)
	) {
		prevWalletAddress = $walletStore.address;
		prevChainId = $chainStore.chainId;
		getReceiverStakingDataFromSubgraph($walletStore.address);
	}
</script>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<StakeDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
