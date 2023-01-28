<script lang="ts">
	import { getContractDetails } from '$lib/controllers/contractController';
	import { restoreWalletConnection } from '$lib/data-stores/walletProviderStore';
	import Header from '$lib/page-components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		restoreWalletConnection();
		getContractDetails();
	});
</script>

<main class="text-center w-full">
	<Header />
	<slot />
</main>
