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
		setBlockMetadataInKalypsoStore,
		updateApprovedFundsInKalypsoStore
	} from '$lib/data-stores/kalypsoStore';
	import {
		connected,
		walletAddressHasChanged,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import type { TokenMetadata } from '$lib/types/environmentTypes';
	import type { Address } from '$lib/types/storeTypes';
	import {
		DEFAULT_KALYPSO_COMPUTE_UTILIZATION,
		DEFAULT_KALYPSO_STAKE_UTILIZATION
	} from '$lib/utils/constants/kalypsoConstants';
	import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.kalypso);
	});

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';

	function calculateIntendedDecreaseActionData(
		intendedUtilization: bigint,
		currentAmount: bigint,
		defaultUtilization: bigint,
		decreaseParam: 'stake' | 'compute'
	) {
		const isDecreaseInitiated = intendedUtilization !== defaultUtilization;
		// this is def a bug
		const intendedDecrease = isDecreaseInitiated
			? ((defaultUtilization - intendedUtilization) * currentAmount) / defaultUtilization
			: 0n;
		return decreaseParam === 'stake'
			? { initiated: isDecreaseInitiated, withdrawAmount: intendedDecrease }
			: { initiated: isDecreaseInitiated, compute: intendedDecrease };
	}

	async function getKalypsoAllowances() {
		console.log('Loading kalypso allowances data');
		const approvedAmount = await getAllowance(
			$walletStore.address,
			$contractAddressStore.KALYPSO,
			$chainConfigStore.tokens.MOCK as TokenMetadata,
			$walletStore.provider as BrowserProvider
		);
		updateApprovedFundsInKalypsoStore(approvedAmount);
		console.log('Kalypso allowances data is loaded', $kalypsoStore.approvedAmount);
	}

	async function initializeKalypsoStore() {
		console.log('Initializing kalypso store data');
		const {
			rewardsAddress,
			stakedAmount,
			sumOfComputeAllocations,
			declaredCompute,
			intendedStakeUtilization,
			intendedComputeUtilization,
			generatorData
		} = await getKalypsoGeneratorDataFromContract($walletStore.address);

		const isRegistered = rewardsAddress !== DEFAULT_KALYPSO_STORE.stakingDetails.rewardsAddress;

		const stakeDecreaseData = calculateIntendedDecreaseActionData(
			intendedStakeUtilization,
			stakedAmount,
			DEFAULT_KALYPSO_STAKE_UTILIZATION,
			'stake'
		);
		const computeDecreaseData = calculateIntendedDecreaseActionData(
			intendedComputeUtilization,
			declaredCompute,
			DEFAULT_KALYPSO_COMPUTE_UTILIZATION,
			'compute'
		);
		console.log({
			intendedStakeUtilization,
			stakedAmount,
			intendedComputeUtilization,
			declaredCompute
		});
		console.log({ stakeDecreaseData, computeDecreaseData });

		if (isRegistered) {
			registerInKalypsoStore(
				rewardsAddress,
				declaredCompute,
				stakedAmount,
				generatorData,
				sumOfComputeAllocations,
				computeDecreaseData as { initiated: boolean; compute: bigint },
				stakeDecreaseData as { initiated: boolean; withdrawAmount: bigint }
			);
		}
		console.log(
			isRegistered ? 'User is registered in kalypso' : 'User is not registered in kalypso'
		);
	}

	function setBlockMetadata() {
		if ($chainConfigStore.kalypso) {
			setBlockMetadataInKalypsoStore(
				$chainConfigStore.kalypso.blockMineTime,
				$chainConfigStore.kalypso.numberOfBlocksToWait
			);
		} else {
			setBlockMetadataInKalypsoStore(
				DEFAULT_KALYPSO_STORE.blockMetadata.blockMineTime,
				DEFAULT_KALYPSO_STORE.blockMetadata.numberOfBlocksToWait
			);
		}
		console.log('Kalypso block metadata is set', $kalypsoStore.blockMetadata);
	}

	async function init() {
		await getKalypsoAllowances();
		await initializeKalypsoStore();
		setBlockMetadata();
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
