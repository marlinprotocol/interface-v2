<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getKalypsoGeneratorDataFromContract } from '$lib/controllers/contract/kalypso';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import {
		chainIdHasChanged,
		setAllowedChainsStore,
		chainStore,
		allowedChainsStore,
		chainConfigStore
	} from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import {
		kalypsoStore,
		registerInKalypsoStore,
		updateApprovedFundsInKalypsoStore
	} from '$lib/data-stores/kalypsoStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import type { TokenMetadata } from '$lib/types/environmentTypes';
	import type { Address } from '$lib/types/storeTypes';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.kalypso);
	});

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';

	async function init() {
		console.log('Loading kalypso allowances data');
		const approvedAmount = await getAllowance(
			$walletStore.address,
			$contractAddressStore.KALYPSO,
			$chainConfigStore.tokens.MOCK as TokenMetadata,
			$walletStore.provider as BrowserProvider
		);
		updateApprovedFundsInKalypsoStore(approvedAmount);
		console.log('Kalypso allowances data is loaded', $kalypsoStore.approvedAmount);

		console.log('Checking if the user is already registered in kalypso...');
		const { isRegistered, rewardsAddress, generatorData, declaredCompute, stakedAmount } =
			await getKalypsoGeneratorDataFromContract($walletStore.address);
		if (isRegistered) {
			registerInKalypsoStore(rewardsAddress, declaredCompute, stakedAmount, generatorData);
		}
		console.log(
			isRegistered ? 'User is registered in kalypso' : 'User is not registered in kalypso'
		);
	}

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	$: if ($connected && chainSupported) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			init();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

{#if $chainStore.isValidChain && chainSupported}
	<PageWrapper>
		<slot />
	</PageWrapper>
{:else}
	<PageWrapper>
		<NetworkPrompt
			title="Unsupported Network"
			description="Please switch to one of the chains in the dropdown to continue"
		/>
	</PageWrapper>
{/if}
