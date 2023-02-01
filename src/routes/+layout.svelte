<script lang="ts">
	import { getContractDetails } from '$lib/controllers/contractController';
	import { restoreWalletConnection } from '$lib/data-stores/walletProviderStore';
	import ENVIRONMENT from '$lib/environments/environment';
	import Header from '$lib/page-components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		// removes console logs in production
		if (ENVIRONMENT.production) {
			window.console.log = function () {};
		}
		restoreWalletConnection();
		getContractDetails();
	});
</script>

<main class="text-center w-full">
	<Header />
	<slot />
</main>
