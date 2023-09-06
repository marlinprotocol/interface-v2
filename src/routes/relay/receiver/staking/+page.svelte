<script lang="ts">
	import { getReceiverStakingDataFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { initializeReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import StakeDashboard from '$lib/page-components/receiver-staking/StakeDashboard.svelte';
	import { modifyReceiverStakingData } from '$lib/utils/data-modifiers/subgraphModifier';

	let prevWalletAddress: string | null = null;
	let prevChainId: number | null = null;

	async function getAndSetReceiverStakingData(address: string) {
		const receiverStakingDataFromSubgraph = await getReceiverStakingDataFromSubgraph(address);
		const modifiedReceiverStakingData = modifyReceiverStakingData(receiverStakingDataFromSubgraph);
		initializeReceiverStakingStore(modifiedReceiverStakingData);
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
	<StakeDashboard />
</div>
