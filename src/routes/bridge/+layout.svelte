<script>
	import { getBridgeContractDetails } from '$lib/controllers/contractController';
	import { onMount } from 'svelte';

	onMount(async () => {
		await getBridgeContractDetails();
	});
</script>

<slot />
