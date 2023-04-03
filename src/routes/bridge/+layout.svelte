<script>
	import { getBridgeContractDetails } from '$lib/controllers/contractController';
	import {
		getPondAndMPondBridgeAllowances,
		getRequestedMPondForConversion
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { onMount } from 'svelte';

	onMount(async () => {
		await getBridgeContractDetails();
	});

	async function init() {
		const [allowances, requestedMPond] = await Promise.all([
			getPondAndMPondBridgeAllowances($walletStore.address, $contractAddressStore.Bridge),
			getRequestedMPondForConversion($walletStore.address)
		]);
		console.log('allowances from api call', allowances);
		bridgeStore.set({
			allowances: {
				pond: allowances.pond,
				mPond: allowances.mPond
			},
			requestedMPond: requestedMPond
		});
	}

	$: if ($connected) {
		init();
	}
</script>

<slot />
