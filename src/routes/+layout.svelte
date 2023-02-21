<script lang="ts">
	import Toast from '$lib/atoms/toast/Toast.svelte';
	import { getContractDetails } from '$lib/controllers/contractController';
	import { restoreWalletConnection } from '$lib/data-stores/walletProviderStore';
	import ENVIRONMENT from '$lib/environments/environment';
	import Header from '$lib/page-components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(async () => {
		// removes console logs in production
		if (ENVIRONMENT.production) {
			window.console.log = function () {};
		}
		await getContractDetails();
		restoreWalletConnection();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="text-center w-full font-poppins">
	<Toast />
	<Header />
	<slot />
</main>
