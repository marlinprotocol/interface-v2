<script>
	import { onMount } from 'svelte';
	import {
		getPondAndMPondBridgeAllowances,
		getRequestedMPondForConversion
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { getBridgeContractDetails } from '$lib/controllers/httpController';

	let fetchedContractDetails = false;

	onMount(async () => {
		await getBridgeContractDetails();
		fetchedContractDetails = true;
	});

	async function init() {
		const [allowances, requestedMPond] = await Promise.all([
			getPondAndMPondBridgeAllowances($walletStore.address, $contractAddressStore.Bridge),
			getRequestedMPondForConversion($walletStore.address)
		]);
		bridgeStore.set({
			allowances: {
				pond: allowances.pond,
				mPond: allowances.mPond
			},
			requestedMPond: requestedMPond
		});
	}

	$: if ($connected && fetchedContractDetails) {
		init();
	}
</script>

<slot />
