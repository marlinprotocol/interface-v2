<script>
	import { getApprovedOysterAllowances, getOysterJobs } from '$lib/controllers/subgraphController';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { onMount } from 'svelte';

	onMount(async () => {
		// TODO: read oyster contract details
		// await getBridgeContractDetails();
	});
	async function init() {
		// TODO: read oyster contract details
		const [allowance, oysterJobs] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address, $contractAddressStore.Bridge),
			getOysterJobs($walletStore.address)
		]);
		console.log('allowance from api call', allowance);
		oysterStore.set({
			...$oysterStore,
			allowance: allowance,
			jobsData: oysterJobs
		});
	}
	$: if ($connected) {
		init();
	}
</script>

<slot />
