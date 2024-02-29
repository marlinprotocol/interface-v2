<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import UnderConstructionPrompt from '$lib/components/prompts/UnderConstructionPrompt.svelte';
	import { getReceiverRewardsDataFromSubgraph } from '$lib/controllers/subgraphController';
	import {
		allowedChainsStore,
		chainIdHasChanged,
		chainStore,
		setAllowedChainsStore
	} from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import RewardsDashboard from '$lib/page-components/receiver-rewards/RewardsDashboard.svelte';
	import { modifyReceiverRewardsData } from '$lib/utils/data-modifiers/subgraphModifier';
	import { onDestroy, onMount } from 'svelte';

	let previousChainId: number | null = null;
	let previousWalletAddress: string = '';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.receiver_rewards);
	});

	async function loadConnectedData() {
		try {
			const rewardsData = await getReceiverRewardsDataFromSubgraph($walletStore.address);
			const modifiedRewardsData = modifyReceiverRewardsData(rewardsData);
			receiverRewardsStore.set({
				...modifiedRewardsData
			});
		} catch (error) {
			console.error('Error while loading connected data for receiver rewards', error);
		}
		console.log('receiver reward store is updated with data');
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if ($connected) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			loadConnectedData();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		// resetting chain id since everything depends on the wallet address in inventory
		previousChainId = null;
		previousWalletAddress = '';
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

{#if chainSupported}
	<RewardsDashboard />
{:else if !chainSupported && $allowedChainsStore.length > 0}
	<NetworkPrompt />
{:else if !chainSupported && $allowedChainsStore.length === 0}
	<UnderConstructionPrompt />
{/if}
