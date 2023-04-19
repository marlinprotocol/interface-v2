<script lang="ts">
	import Toast from '$lib/atoms/toast/Toast.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { restoreWalletConnection } from '$lib/data-stores/walletProviderStore';
	import ENVIRONMENT from '$lib/environments/environment';
	import { onMount } from 'svelte';
	import '../app.css';
	import { getContractDetails } from '$lib/controllers/httpController';

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

<style>
	main {
		width: 82%;
		margin: 0 auto;
	}

	@media (max-width: 1200px) {
		main {
			width: 90%;
		}
	}
</style>
