<script>
	import { getBridgeContractDetails } from '$lib/controllers/contractController';
	import { onMount } from 'svelte';

	onMount(async () => {
		// TODO: read oyster contract details
		// await getBridgeContractDetails();
	});
</script>

<slot />
