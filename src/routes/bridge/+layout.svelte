<script lang="ts">
	import { getBridgeContractDetails } from '$lib/controllers/httpController';
	import {
		getPondAndMPondBridgeAllowancesFromSubgraph,
		getRequestedMPondForConversionFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import {
		contractAddressStore,
		updateContractStoresWithoutBridge
	} from '$lib/data-stores/contractStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { modifyAllowancesData } from '$lib/utils/data-modifiers/subgraphModifier';
	import { onMount } from 'svelte';

	let fetchedContractDetails = false;
	onMount(async () => {
		try {
			fetchedContractDetails = false;
			const bridgeContractDetails = await getBridgeContractDetails();
			const addresses = bridgeContractDetails.addresses;
			const ABIS = bridgeContractDetails.ABI;

			updateContractStoresWithoutBridge(addresses, ABIS);

			fetchedContractDetails = true;
		} catch (error: any) {
			addToast({
				variant: 'error',
				message: `${error.message}. Please try refreshing the page.`,
				timeout: 6000
			});
			console.error('Error while fetching bridge contract details', error);
		}
	});

	async function init() {
		const [allowancesData, requestedMPond] = await Promise.all([
			getPondAndMPondBridgeAllowancesFromSubgraph(
				$walletStore.address,
				$contractAddressStore.Bridge
			),
			getRequestedMPondForConversionFromSubgraph($walletStore.address)
		]);

		const allowances = modifyAllowancesData(allowancesData);

		bridgeStore.set({
			allowances: {
				pond: allowances.pond,
				mPond: allowances.mPond
			},
			requestedMPond: requestedMPond
		});
	}

	$: if ($connected && $chainStore.chainId && fetchedContractDetails) {
		init();
	}
</script>

<slot />
