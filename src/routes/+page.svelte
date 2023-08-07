<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getReceiverStakingDataFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import StakeDashboard from '$lib/page-components/receiver-staking/StakeDashboard.svelte';
	import { modifyReceiverStakingData } from '$lib/utils/data-modifiers/subgraphModifier';

	let prevWalletAddress: string | null = null;
	let prevChainId: number | null = null;

	async function getAndSetReceiverStakingData(address: string) {
		const receiverStakingDataFromSubgraph = await getReceiverStakingDataFromSubgraph(address);
		const modifiedReceiverStakingData = modifyReceiverStakingData(receiverStakingDataFromSubgraph);
		receiverStakingStore.set(modifiedReceiverStakingData);
	}

	$: if (
		$walletStore.address !== '' &&
		(prevWalletAddress !== $walletStore.address ||
			prevChainId !== $chainStore.chainId ||
			prevWalletAddress === null ||
			prevChainId === null)
	) {
		prevWalletAddress = $walletStore.address;
		prevChainId = $chainStore.chainId;
		getAndSetReceiverStakingData($walletStore.address);
	}
</script>

<svelte:head>
	<title>Marlin Receiver Portal</title>
</svelte:head>

<div class="py-4">
	{#if $chainStore.isValidChain}
		<StakeDashboard />
	{:else}
		<NetworkPrompt />
	{/if}
</div>
