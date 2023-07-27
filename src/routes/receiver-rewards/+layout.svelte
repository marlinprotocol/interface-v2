<script lang="ts">
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { connected } from '$lib/data-stores/walletProviderStore';

	function loadConnectedData() {
		// TODO: add subgraph call for fetching rewards data here
	}

	$: if ($connected && $chainStore.chainId) {
		loadConnectedData();
	}
</script>

<slot />
