<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import { getReceiverStakingDataFromSubgraph } from '$lib/controllers/subgraphController';
	import {
		allowedChainsStore,
		chainStore,
		setAllowedChainsStore
	} from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { initializeReceiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import StakeDashboard from '$lib/page-components/receiver-staking/StakeDashboard.svelte';
	import { modifyReceiverStakingData } from '$lib/utils/data-modifiers/subgraphModifier';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.receiver_staking);
	});

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

	$: if ($walletStore.address === '') {
		prevWalletAddress = null;
		prevChainId = null;
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

{#if chainSupported}
	<StakeDashboard />
{:else}
	<NetworkPrompt />
{/if}
