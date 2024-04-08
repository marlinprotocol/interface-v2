<script lang="ts">
	import { getMPondToPondConversionHistoryFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainIdHasChanged, chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		walletAddressHasChanged,
		walletStore,
		connected
	} from '$lib/data-stores/walletProviderStore';
	import MPondToPondHistoryData from '$lib/page-components/v2/bridge/history/MPondToPondHistoryData.svelte';
	import { modifyMPondToPondConversionHistory } from '$lib/utils/data-modifiers/subgraphModifier';
	import type { Address } from '@web3-onboard/core/dist/types';

	let previousChainId: number | null = null;
	let previousWalletAddress: Address = '';
	let loading = false;
	let historyData: any;

	async function getMpondToPondHistoryData(address: Address) {
		loading = true;
		const historyDataFromSubgraph = await getMPondToPondConversionHistoryFromSubgraph(address);
		historyData = historyDataFromSubgraph
			? modifyMPondToPondConversionHistory(historyDataFromSubgraph)
			: [];
		loading = false;
	}

	$: if ($connected) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			getMpondToPondHistoryData($walletStore.address);
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}
	const pondToMPondHistoryData = [
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(20),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		},
		{
			id: '1',
			mpondAmount: BigInt(100),
			mpondConverted: BigInt(90),
			pondAmount: BigInt(9000),
			pondEligible: BigInt(10000),
			pondPending: BigInt(500),
			pondInProcess: BigInt(100),
			timestamp: 1617900000,
			transactionHash: '0x123...',
			isCancelled: false,
			cancelHash: '',
			conversionHistory: [
				{
					id: '1.1',
					mpondToConvert: BigInt(50),
					transactionHash: '0xabc...',
					timestamp: 1617901000
				},
				{
					id: '1.2',
					mpondToConvert: BigInt(40),
					transactionHash: '0xdef...',
					timestamp: 1617902000
				}
			],
			eligibleCycles: [], // Replace with actual MPondEligibleCyclesModel data
			currentCycle: 1,
			requestEpoch: BigInt(2)
		}
	];
</script>

<MPondToPondHistoryData
	bind:loading
	historyData={[...pondToMPondHistoryData, ...pondToMPondHistoryData.reverse()]}
/>
