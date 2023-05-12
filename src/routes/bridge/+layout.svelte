<script lang="ts">
	import {
		getPondAndMPondBridgeAllowances,
		getRequestedMPondForConversion
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';

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

	$: if ($connected) {
		init();
	}
</script>

<slot />
