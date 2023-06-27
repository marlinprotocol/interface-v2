<script lang="ts">
	import {
		getPondAndMPondBridgeAllowancesFromSubgraph,
		getRequestedMPondForConversionFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';

	async function init() {
		const [allowances, requestedMPond] = await Promise.all([
			getPondAndMPondBridgeAllowancesFromSubgraph(
				$walletStore.address,
				$contractAddressStore.Bridge
			),
			getRequestedMPondForConversionFromSubgraph($walletStore.address)
		]);
		bridgeStore.set({
			allowances: {
				pond: allowances.pond,
				mPond: allowances.mPond
			},
			requestedMPond: requestedMPond
		});
	}

	$: if ($connected && $chainStore.chainId) {
		init();
	}
</script>

<slot />
